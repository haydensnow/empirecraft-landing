import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const apiBase = "https://discord.com/api/v10";
const guildId = "538113944053874688";
const channelId = "567476367420030986";
const token = process.env.DISCORD_BOT_TOKEN;

if (!token) {
  throw new Error("DISCORD_BOT_TOKEN is required");
}

const response = await fetch(
  `${apiBase}/channels/${channelId}/messages?limit=100`,
  {
    method: "GET",
    headers: {
      Authorization: `Bot ${token}`,
      "User-Agent":
        "EmpireCraftWebsite (https://www.empirecraftmc.com, 1.0)",
    },
  },
);

if (!response.ok) {
  throw new Error(`Discord returned ${response.status}`);
}

const messages = await response.json();

function replaceDiscordTimestamps(value) {
  return value.replace(/<t:(\d+)(?::[A-Za-z])?>/g, (_, epoch) => {
    const date = new Date(Number(epoch) * 1000);
    return new Intl.DateTimeFormat("en", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "UTC",
    }).format(date);
  });
}

function cleanDiscordText(value = "") {
  return replaceDiscordTimestamps(value)
    .replace(/@everyone|@here/g, "")
    .replace(/<@!?\d+>/g, "a community member")
    .replace(/<@&\d+>/g, "")
    .replace(/<#\d+>/g, "the Discord info channel")
    .replace(/<a?:[A-Za-z0-9_]+:\d+>/g, "")
    .replace(/\p{Extended_Pictographic}|\uFE0F/gu, "")
    .replace(/\*\*\*|\*\*|__|~~/g, "")
    .replace(/(^|\s)[*_](?=\S)|(?<=\S)[*_](?=\s|$)/g, "$1")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]{2,}/g, " ")
    .trim();
}

function categoryFor(text) {
  const lower = text.toLowerCase();
  if (
    /secret santa|event|ender dragon|ender portal|halloween|build contest/.test(
      lower,
    )
  )
    return "Event";
  if (/season|new world|world download|launch/.test(lower)) return "Season";
  if (/harassment|toxic|community standard|welcoming place/.test(lower))
    return "Community";
  if (
    /server|updated|update|version|border|maintenance|backup|data pack|mod/.test(
      lower,
    )
  )
    return "Server";
  return "Announcement";
}

function titleFor(text, category) {
  const lower = text.toLowerCase();
  if (/season 6|sixth season|odyssey/.test(lower)) return "Season 6 is live";
  if (/season 5/.test(lower) && /download|backup|shut down/.test(lower))
    return "Season 5 world download";
  const version =
    text.match(
      /(?:server (?:has been )?updated to|updated the server to)\s+(?:fabric\s+)?(\d+(?:\.\d+)*)/i,
    )?.[1] ??
    text.match(/updated to\s+(?:fabric\s+)?(\d+(?:\.\d+)*)/i)?.[1];

  if (version) return `Server updated to ${version}`;
  if (/secret santa/.test(lower) && /recipient|received a message/.test(lower))
    return "Secret Santa matches are out";
  if (/secret santa/.test(lower)) return "Secret Santa is back";
  if (/community standards|one-strike|harassment/.test(lower))
    return "A reminder about community standards";
  if (/ender portal/.test(lower)) return "The End opening is scheduled";
  if (/end event/.test(lower) && /sunday/.test(lower))
    return "The End event moved to Sunday";
  if (/border/.test(lower) && /expand/.test(lower))
    return "The world border has expanded";

  const firstLine = text
    .split(/\n|[.!?]\s/)[0]
    .replace(/^[-–—\s]+/, "")
    .trim();
  const fallback = firstLine || `${category} from Discord`;
  return fallback.length > 72 ? `${fallback.slice(0, 69).trim()}…` : fallback;
}

function bodyFor(text, title) {
  const withoutUrls = text
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  const usefulParagraphs = withoutUrls
    .split(/\n\n/)
    .filter((paragraph) => paragraph.replace(/\W/g, "").length >= 12);
  const compact = usefulParagraphs.join(" ").replace(/\n/g, " ").trim();
  const withoutRepeatedTitle =
    compact.toLowerCase() === title.toLowerCase() ? "" : compact;
  const body = withoutRepeatedTitle || withoutUrls.replace(/\n/g, " ");
  if (body.length <= 280) return body;
  const clipped = body.slice(0, 277);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${clipped.slice(0, lastSpace > 220 ? lastSpace : 277).trim()}…`;
}

function firstLink(message) {
  const fromContent = message.content?.match(/https?:\/\/[^\s>]+/)?.[0];
  return fromContent ?? message.embeds?.find((embed) => embed.url)?.url ?? null;
}

const posts = messages
  .filter((message) => !message.author?.bot)
  .map((message) => {
    const embedText = message.embeds
      ?.map((embed) => [embed.title, embed.description].filter(Boolean).join("\n"))
      .filter(Boolean)
      .join("\n\n");
    const cleaned = cleanDiscordText(
      [message.content, embedText].filter(Boolean).join("\n\n"),
    );
    const category = categoryFor(cleaned);
    const title = titleFor(cleaned, category);
    const body = bodyFor(cleaned, title);
    return {
      id: message.id,
      title,
      body,
      category,
      publishedAt: message.timestamp,
      author:
        message.author?.global_name ??
        message.author?.username ??
        "EmpireCraft",
      reactions: (message.reactions ?? []).reduce(
        (total, reaction) => total + reaction.count,
        0,
      ),
      link: firstLink(message),
      sourceUrl: `https://discord.com/channels/${guildId}/${channelId}/${message.id}`,
    };
  })
  .filter(
    (post) =>
      !/please vote above/i.test(post.body) &&
      (post.body.length >= 24 || post.title.length >= 24),
  )
  .slice(0, 12);

const output = {
  generatedAt: new Date().toISOString(),
  posts,
};

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(scriptDir, "../public/news.json");
await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(output, null, 2)}\n`);

console.log(`Wrote ${posts.length} announcements to public/news.json`);
