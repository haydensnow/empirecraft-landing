"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";

type NewsPost = {
  id: string;
  title: string;
  body: string;
  category: "Server" | "Event" | "Community" | "Season" | "Announcement";
  publishedAt: string;
  author: string;
  reactions: number;
  link?: string | null;
  sourceUrl: string;
};

type NewsPayload = {
  generatedAt: string;
  posts: NewsPost[];
};

const DISCORD_URL = "https://discord.gg/AtxJ6JNGTb";
const MAP_URL = "https://map.empirecraftmc.com/";
const SERVER_IP = "play.empirecraftmc.com";

const fallbackNews: NewsPost[] = [
  {
    id: "1529220462310326503",
    title: "Server updated to 26.2",
    body: "The server is now on 26.2, and the world border radius has expanded by another 500 blocks.",
    category: "Server",
    publishedAt: "2026-07-21T20:16:09.757Z",
    author: "Hayden",
    reactions: 9,
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1529220462310326503",
  },
  {
    id: "1465088466663768338",
    title: "Server updated to 1.21.11",
    body: "The server has been updated to 1.21.11.",
    category: "Server",
    publishedAt: "2026-01-25T20:58:30.480Z",
    author: "Hayden",
    reactions: 10,
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1465088466663768338",
  },
  {
    id: "1449579968966426746",
    title: "Secret Santa matches are out",
    body: "Everyone who signed up should have received their Secret Santa recipient. If yours is missing, message Hayden.",
    category: "Event",
    publishedAt: "2025-12-14T01:53:16.495Z",
    author: "Hayden",
    reactions: 5,
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1449579968966426746",
  },
  {
    id: "1448785694867722457",
    title: "Secret Santa is back",
    body: "Sign up to surprise another player with a gift or a build at their base before Christmas.",
    category: "Event",
    publishedAt: "2025-12-11T21:17:06.793Z",
    author: "Hayden",
    reactions: 5,
    link:
      "https://docs.google.com/forms/d/e/1FAIpQLSdZFzaAOv8IDTU9HbLm6YHrr38I31eCuJp5_fTi-ZVulBzEIA/viewform?usp=dialog",
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1448785694867722457",
  },
  {
    id: "1445886287872659476",
    title: "Season 5 world download",
    body: "Season 5 wrapped a few days early after technical issues and low activity. The final world backup is available to download.",
    category: "Season",
    publishedAt: "2025-12-03T21:15:54.297Z",
    author: "Hayden",
    reactions: 16,
    link:
      "https://drive.google.com/file/d/1sWen4alktrKPdbOWFui5eOAqwngQSfaN/view?usp=sharing",
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1445886287872659476",
  },
  {
    id: "1440899046804947076",
    title: "A reminder about community standards",
    body: "Harassment and toxic behavior are not tolerated. We use a one-strike policy so this stays a comfortable place to play.",
    category: "Community",
    publishedAt: "2025-11-20T02:58:23.368Z",
    author: "Hayden",
    reactions: 5,
    sourceUrl:
      "https://discord.com/channels/538113944053874688/567476367420030986/1440899046804947076",
  },
];

const applicationQuestions = [
  "Your Minecraft username",
  "Your age",
  "Where you’re from",
  "How you found the server",
  "Why you’d like to join",
  "Your favorite movie",
];

const rules = [
  "Respect your fellow players. No bullying, racism, sexism, homophobia, bigotry, hate speech, or derogatory language of any kind.",
  "No griefing, stealing, or mean-spirited trolling.",
  "No cheating, hacking, use of x-ray, or similar actions.",
];

function formatPostDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(value));
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);
  const [news, setNews] = useState<NewsPost[]>(fallbackNews);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    const onScroll = () => {
      const hero = document.getElementById("top");
      const header = document.querySelector(".site-header");
      const headerHeight =
        header instanceof HTMLElement ? header.offsetHeight : 78;

      setScrolled(
        (hero?.getBoundingClientRect().bottom ?? 680) <= headerHeight,
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    fetch("/news.json")
      .then((response) => {
        if (!response.ok) throw new Error("News feed unavailable");
        return response.json() as Promise<NewsPayload>;
      })
      .then((payload) => {
        if (payload.posts?.length) setNews(payload.posts);
      })
      .catch(() => {
        // The built-in snapshot keeps the page useful between feed refreshes.
      });
  }, []);

  const filters = useMemo(
    () => ["All", ...Array.from(new Set(news.map((post) => post.category)))],
    [news],
  );
  const visibleNews =
    filter === "All" ? news : news.filter((post) => post.category === filter);

  async function copyServerIp() {
    await navigator.clipboard.writeText(SERVER_IP);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2400);
  }

  return (
    <main>
      <header className={`site-header ${scrolled ? "site-header--paper" : ""}`}>
        <div className="header-inner">
          <a className="wordmark" href="#top" aria-label="EmpireCraft home">
            <Image
              src="/assets/logo-wordmark.svg"
              alt="EmpireCraft"
              width={145}
              height={19}
            />
          </a>
          <nav aria-label="Primary navigation">
            <a className="ec-navlink" href="#about">
              About
            </a>
            <a className="ec-navlink" href="#news">
              News
            </a>
            <a className="ec-navlink" href="#map">
              Map
            </a>
            <a className="ec-navlink" href="#rules">
              Rules
            </a>
          </nav>
          <a
            className={`ec-btn ec-btn--sm ${
              scrolled ? "ec-btn--primary" : "ec-btn--glass"
            } header-cta`}
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
          >
            Join Discord
          </a>
        </div>
      </header>

      <section className="hero" id="top">
        <Image
          className="hero-image"
          src="/assets/images/hero-spawn-valley.png"
          alt="The EmpireCraft spawn valley at dusk, with paths, builds, and a Nether portal"
          fill
          priority
          sizes="100vw"
        />
        <div className="hero-scrim" />
        <div className="hero-content ec-container">
          <div className="hero-copy">
            <h1 className="ec-gradient-text">
              A small, whitelisted Minecraft server.
            </h1>
            <p>
              EmpireCraft is a private Java survival server with a few
              quality-of-life plugins. The community started in 2018, and
              Season 6 began in October 2025. We haven’t played as much lately,
              so we’re looking for some new people to join us.
            </p>
            <div className="hero-actions">
              <a
                className="ec-btn ec-btn--glass"
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
              >
                Join the Discord
              </a>
              <a
                className="ec-btn ec-btn--glass"
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                View the map
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="readouts ec-container" aria-label="Server facts">
        <div>
          <span className="ec-micro">Community since</span>
          <strong>2018</strong>
        </div>
        <div>
          <span className="ec-micro">Season 6 since</span>
          <strong>Oct. 2025</strong>
        </div>
        <div>
          <span className="ec-micro">Edition</span>
          <strong>Java</strong>
        </div>
        <div>
          <span className="ec-micro">Latest update</span>
          <strong>26.2</strong>
        </div>
      </section>

      <section className="intro-section ec-container" id="about">
        <div>
          <h2>A mostly vanilla server with a small community.</h2>
        </div>
        <div className="intro-copy">
          <p>
            We use a whitelist to keep the server friendly and prevent
            griefing. Most of us are adults who play when we have time, so
            there is no activity requirement.
          </p>
          <p>
            The server has been quieter recently. We’re hoping to bring in a
            few new players and get more group projects and events going again.
          </p>
        </div>
      </section>

      <section className="feature-grid ec-container" aria-label="Why EmpireCraft">
        <article className="ec-card feature-card">
          <h3>Vanilla, with a few extras</h3>
          <p>
            We use DiscordSRV, BlueMap, and optional Simple Voice Chat. The
            basic survival game is unchanged.
          </p>
        </article>
        <article className="ec-card feature-card">
          <h3>No activity requirement</h3>
          <p>
            Play every day or take a few weeks off. We understand that people
            have jobs, school, and other games.
          </p>
        </article>
        <article className="ec-card feature-card">
          <h3>Whitelisted</h3>
          <p>
            Applications are short and handled through Discord. The whitelist
            helps us keep the world free of griefing and theft.
          </p>
        </article>
      </section>

      <section className="server-section ec-container">
        <div className="section-heading">
          <h2>Server information</h2>
        </div>
        <div className="server-grid">
          <div className="ec-card ec-card--frame server-card">
            <h3>Server address</h3>
            <div className="ip-row">
              <code>{SERVER_IP}</code>
              <button
                className="ec-btn ec-btn--secondary ec-btn--sm"
                type="button"
                onClick={copyServerIp}
              >
                Copy IP
              </button>
            </div>
            <p>
              EmpireCraft runs Java Edition, so you can play on PC, Mac, or
              Linux. Let us know in Discord if Bedrock support would be useful.
            </p>
            <div className="tag-row">
              <span className="ec-tag">Semi-vanilla</span>
              <span className="ec-tag">Whitelist</span>
              <span className="ec-tag">Primarily 18+</span>
            </div>
          </div>
          <div className="ec-panel facts-panel">
            <div className="ec-panel__head">
              <span className="ec-panel__title">At a glance</span>
            </div>
            <dl>
              <div>
                <dt>Version</dt>
                <dd>26.2 · announced 21 July</dd>
              </div>
              <div>
                <dt>Season</dt>
                <dd>6 · since 14 October 2025</dd>
              </div>
              <div>
                <dt>World seed</dt>
                <dd>
                  <code>15123566709681618</code>
                </dd>
              </div>
              <div>
                <dt>Optional mods</dt>
                <dd>Simple Voice Chat · Status</dd>
              </div>
            </dl>
          </div>
        </div>
      </section>

      <section className="news-section ec-container" id="news">
        <div className="news-heading">
          <div>
            <h2>Announcements</h2>
            <p className="section-lead">
              These are pulled from our Discord announcements channel. Pings
              and Discord formatting are removed.
            </p>
          </div>
          <a
            className="ec-btn ec-btn--secondary"
            href={DISCORD_URL}
            target="_blank"
            rel="noreferrer"
          >
            Open Discord
          </a>
        </div>
        <div className="filter-row" aria-label="Filter announcements">
          {filters.map((item) => (
            <button
              className={`ec-tag ec-tag--interactive ${
                filter === item ? "ec-tag--selected" : ""
              }`}
              type="button"
              key={item}
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="news-list" aria-live="polite">
          {visibleNews.slice(0, 10).map((post) => (
            <article className="news-row" key={post.id}>
              <time dateTime={post.publishedAt}>
                {formatPostDate(post.publishedAt)}
              </time>
              <div>
                <div className="news-meta">
                  <span
                    className={`ec-badge ec-badge--${
                      post.category === "Event"
                        ? "lime"
                        : post.category === "Community"
                          ? "brown"
                          : post.category === "Season"
                            ? "orange"
                            : post.category === "Server"
                              ? "blue"
                              : "neutral"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span>{post.author}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <div className="news-links">
                  {post.link ? (
                    <a
                      className="ec-well-link"
                      href={post.link}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Open the attached link ↗
                    </a>
                  ) : null}
                  <a
                    className="ec-well-link"
                    href={post.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    View in Discord ↗
                  </a>
                  {post.reactions > 0 ? (
                    <span>{post.reactions} reactions</span>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="map-section" id="map">
        <div className="ec-container map-grid">
          <div className="map-copy">
            <h2>Live map</h2>
            <p>
              Open the map to see spawn, roads, rail lines, towns, and the rest
              of the current world.
            </p>
            <a
              className="ec-btn ec-btn--primary"
              href={MAP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open the map
            </a>
          </div>
          <div className="map-frame">
            <iframe
              src={MAP_URL}
              title="EmpireCraft live world map"
              loading="lazy"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="rules-section ec-container" id="rules">
        <div className="section-heading">
          <h2>Rules</h2>
        </div>
        <ol className="rules-list">
          {rules.map((rule, index) => (
            <li key={rule}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{rule}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="apply-section ec-container" id="apply">
        <div className="apply-card">
          <div className="apply-copy">
            <h2>How to join</h2>
            <p>
              Join the Discord and DM your answers to @Dsman124 or @Red. We ask
              six short questions before adding you to the whitelist.
            </p>
            <a
              className="ec-btn ec-btn--glass"
              href={DISCORD_URL}
              target="_blank"
              rel="noreferrer"
            >
              Open Discord to apply
            </a>
          </div>
          <ol className="question-list">
            {applicationQuestions.map((question, index) => (
              <li key={question}>
                <span>{index + 1}</span>
                {question}
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer>
        <div className="ec-container footer-grid">
          <div className="footer-brand">
            <Image
              src="/assets/logo-wordmark.svg"
              alt="EmpireCraft"
              width={150}
              height={20}
            />
            <p>
              A private, whitelisted Java Minecraft server.
            </p>
          </div>
          <div>
            <span className="ec-micro">Server</span>
            <a href={MAP_URL} target="_blank" rel="noreferrer">
              Live map
            </a>
            <button type="button" onClick={copyServerIp}>
              Copy server IP
            </button>
          </div>
          <div>
            <span className="ec-micro">Community</span>
            <a href={DISCORD_URL} target="_blank" rel="noreferrer">
              Join Discord
            </a>
            <a
              href="https://patreon.com/empirecraftsmp"
              target="_blank"
              rel="noreferrer"
            >
              Support on Patreon
            </a>
          </div>
        </div>
        <div className="ec-container footer-bottom">
          <span>© 2018–2026 EmpireCraft</span>
          <code>{SERVER_IP}</code>
        </div>
      </footer>

      {copied ? (
        <div className="copy-toast" role="status">
          <span />
          <div>
            <strong>Server IP copied</strong>
            <code>{SERVER_IP}</code>
          </div>
        </div>
      ) : null}
    </main>
  );
}
