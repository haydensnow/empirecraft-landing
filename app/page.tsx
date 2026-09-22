"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const DISCORD_URL = "https://discord.gg/AtxJ6JNGTb";
const MAP_URL = "https://map.empirecraftmc.com/";
const SERVER_IP = "play.empirecraftmc.com";

const features = [
  {
    icon: "diamond_pickaxe",
    title: "Mostly Vanilla",
    text: "Classic survival with a few useful extras: BlueMap, DiscordSRV, and optional Simple Voice Chat.",
  },
  {
    icon: "oak_sapling",
    title: "Play at Your Pace",
    text: "Most of us are adults. Build when you have time, take a break when you need one. No activity requirement.",
  },
  {
    icon: "book",
    title: "A Small Community",
    text: "A short Discord application keeps the whitelist personal. We’re welcoming a few new players.",
  },
];
const rules = [
  {
    title: "Respect Each Other",
    text: "No bullying, hate speech, harassment, or discrimination.",
  },
  {
    title: "Respect the World",
    text: "No griefing, stealing, or mean-spirited trolling.",
  },
  {
    title: "Play Fair",
    text: "No cheats, hacked clients, x-ray, or exploits that give an unfair advantage.",
  },
];
const questions = [
  "Minecraft username",
  "Age",
  "Where you’re from",
  "How you found us",
  "Why you’d like to join",
  "Favorite movie",
];

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span className="arrow" aria-hidden="true">
      {diagonal ? "↗" : "→"}
    </span>
  );
}

function Item({ name, size = 48 }: { name: string; size?: number }) {
  return (
    <Image
      className="pixel-item"
      src={`/assets/minecraft/${name}.png`}
      width={size}
      height={size}
      alt=""
    />
  );
}

export default function Home() {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">(
    "idle",
  );
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapFrame = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (mapLoaded) mapFrame.current?.focus();
  }, [mapLoaded]);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const announcementTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [announcement, setAnnouncement] = useState("");

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
      if (announcementTimer.current) clearTimeout(announcementTimer.current);
    },
    [],
  );

  async function copyServerIp() {
    if (copyTimer.current) clearTimeout(copyTimer.current);
    if (announcementTimer.current) clearTimeout(announcementTimer.current);
    setAnnouncement("");
    try {
      await navigator.clipboard.writeText(SERVER_IP);
      setCopyState("copied");
      announcementTimer.current = setTimeout(
        () =>
          setAnnouncement(
            "Server address copied. You’ll need whitelist approval before joining.",
          ),
        100,
      );
      copyTimer.current = setTimeout(() => setCopyState("idle"), 3000);
    } catch {
      setCopyState("error");
      announcementTimer.current = setTimeout(
        () =>
          setAnnouncement(
            `Couldn’t copy. Select and copy the address manually: ${SERVER_IP}`,
          ),
        100,
      );
    }
  }

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header" id="top">
        <div className="container header-inner">
          <a className="wordmark" href="#top" aria-label="EmpireCraft home">
            <span>EmpireCraft</span>
          </a>
          <nav aria-label="Primary navigation">
            <a href="#about">About</a>
            <a href="#map">Map</a>
            <a href="#rules">Rules</a>
          </nav>
          <a className="button button-green header-cta" href="#join">
            Join Now <Arrow />
          </a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="hero-heading">
          <Image
            className="hero-image"
            src="/assets/images/hero-spawn-valley.webp"
            alt="EmpireCraft’s mountain-ringed spawn, with player-built paths and a glowing Nether portal at sunset"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
          />
          <div className="hero-shade" />
          <div className="container hero-content">
            <div className="hero-copy">
              <h1 id="hero-heading">Build Together.</h1>
              <p className="hero-description">
                A small, whitelisted Java SMP. Mostly vanilla, building together
                since 2018.
              </p>
              <div className="hero-actions">
                <a className="button button-green" href="#join">
                  Join Now <Arrow />
                </a>
                <a
                  className="button button-stone"
                  href={MAP_URL}
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the Map <Arrow diagonal />
                </a>
              </div>
            </div>
            <span className="world-caption">
              <span aria-hidden="true">⌖</span> A view from spawn · Season 6
            </span>
          </div>
        </section>
        <div className="grass-divider" aria-hidden="true" />

        <div className="facts-strip">
          <dl className="container quick-facts">
            <div>
              <dt>Edition</dt>
              <dd>Java</dd>
            </div>
            <div>
              <dt>Version</dt>
              <dd>26.2</dd>
            </div>
            <div>
              <dt>World</dt>
              <dd>Season 6</dd>
            </div>
          </dl>
        </div>

        <section
          className="container about-section section-space"
          id="about"
          aria-labelledby="about-heading"
        >
          <div className="section-intro">
            <div>
              <h2 id="about-heading">
                Your Projects.
                <br />
                Good Neighbors.
              </h2>
            </div>
            <p>
              EmpireCraft is a private survival server for people who enjoy the
              game together. Our community started in 2018; Season 6 began in
              October 2025. It’s been quieter lately, and we’d love a few new
              faces.
            </p>
          </div>
          <div className="feature-grid">
            {features.map((feature) => (
              <article className="feature-card" key={feature.title}>
                <div className="inventory-slot">
                  <Item name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section
          className="world-section"
          id="map"
          aria-labelledby="map-heading"
        >
          <div className="container world-grid">
            <div className="world-copy">
              <Item name="compass_16" size={56} />
              <h2 id="map-heading">
                A World With
                <br />
                Room for You.
              </h2>
              <p>
                Find spawn, follow the roads, and see what everyone’s been
                building. Explore the current world in BlueMap.
              </p>
              <a
                className="button button-green"
                href={MAP_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open the Live Map <Arrow diagonal />
              </a>
            </div>
            <div className="map-panel">
              <div className="panel-title">
                <span>EmpireCraft / Overworld</span>
                <span className="panel-label">Season 6</span>
              </div>
              <div className="map-viewport">
                {mapLoaded ? (
                  <iframe
                    src={MAP_URL}
                    title="EmpireCraft interactive world map"
                    tabIndex={0}
                    ref={mapFrame}
                    allowFullScreen
                  />
                ) : (
                  <>
                    <Image
                      src="/assets/images/hero-spawn-valley.webp"
                      alt="A preview of EmpireCraft’s spawn valley"
                      fill
                      sizes="(max-width: 800px) 100vw, 60vw"
                      className="map-preview"
                    />
                    <div className="map-preview-action">
                      <button
                        className="button button-stone"
                        type="button"
                        onClick={() => setMapLoaded(true)}
                      >
                        Load Interactive Map <Arrow />
                      </button>
                      <span>
                        World preview · Interactive map loads on request
                      </span>
                    </div>
                  </>
                )}
              </div>
              <p className="map-hint">
                {mapLoaded ? (
                  <>
                    Map not loading?{" "}
                    <a href={MAP_URL} target="_blank" rel="noreferrer">
                      Open BlueMap in a New Tab <Arrow diagonal />
                    </a>
                  </>
                ) : (
                  "A closer look before you join."
                )}
              </p>
            </div>
          </div>
        </section>

        <section
          className="container rules-section section-space"
          id="rules"
          aria-labelledby="rules-heading"
        >
          <div className="rules-heading">
            <h2 id="rules-heading">Three Ground Rules</h2>
          </div>
          <ol className="rules-list" role="list">
            {rules.map((rule, i) => (
              <li key={rule.title}>
                <span className="rule-number" aria-hidden="true">
                  0{i + 1}
                </span>
                <div>
                  <h3>{rule.title}</h3>
                  <p>{rule.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="join-section"
          id="join"
          aria-labelledby="join-heading"
        >
          <div className="container join-grid">
            <div className="join-copy">
              <h2 id="join-heading">Join the Server</h2>
              <p>
                We use a whitelist to get to know who’s joining. Start in
                Discord and wait for approval before connecting.
              </p>
              <ol className="join-steps" role="list">
                <li>
                  <span aria-hidden="true">1</span>
                  <div>
                    <h3>Join Our Discord</h3>
                    <p>Say hello and read the server rules.</p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">2</span>
                  <div>
                    <h3>Send Your Application</h3>
                    <p>
                      DM your answers to <strong>@Dsman124</strong> or{" "}
                      <strong>@Red</strong>.
                    </p>
                  </div>
                </li>
                <li>
                  <span aria-hidden="true">3</span>
                  <div>
                    <h3>Connect After Approval</h3>
                    <p>In Java Edition, choose Multiplayer → Add Server.</p>
                  </div>
                </li>
              </ol>
              <a
                className="button button-green"
                href={DISCORD_URL}
                target="_blank"
                rel="noreferrer"
              >
                Open Discord to Apply <Arrow diagonal />
              </a>
            </div>
            <div className="join-panels">
              <div className="application-panel">
                <div className="panel-title">
                  <Item name="book" size={24} />
                  <h3>The Application</h3>
                  <span>6 questions</span>
                </div>
                <ol className="question-list">
                  {questions.map((q) => (
                    <li key={q}>{q}</li>
                  ))}
                </ol>
              </div>
              <div className="server-panel">
                <h3>Already Whitelisted?</h3>
                <p>Java Edition · PC, Mac, or Linux</p>
                <code className="server-address">{SERVER_IP}</code>
                <button
                  className="button button-stone copy-button"
                  type="button"
                  onClick={copyServerIp}
                >
                  {copyState === "copied" ? "Copied!" : "Copy Server Address"}
                  <span aria-hidden="true">
                    {copyState === "copied" ? "✓" : "⧉"}
                  </span>
                </button>
                {copyState === "error" && (
                  <p className="copy-error">
                    Couldn’t copy. Select the address above and copy it
                    manually.
                  </p>
                )}
                <p className="bedrock-note">
                  Playing on Bedrock? Let us know in Discord.
                </p>
                <details className="server-details">
                  <summary>More Server Details</summary>
                  <dl>
                    <div>
                      <dt>Season 6 started</dt>
                      <dd>14 October 2025</dd>
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
                </details>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="container footer-main">
          <a className="wordmark" href="#top">
            <span>EmpireCraft</span>
          </a>
          <nav aria-label="Footer navigation">
            <a href={DISCORD_URL} target="_blank" rel="noreferrer">
              Discord <Arrow diagonal />
            </a>
            <a href={MAP_URL} target="_blank" rel="noreferrer">
              Map <Arrow diagonal />
            </a>
            <a
              href="https://patreon.com/empirecraftsmp"
              target="_blank"
              rel="noreferrer"
            >
              Support on Patreon <Arrow diagonal />
            </a>
          </nav>
        </div>
        <div className="container footer-bottom">
          <span>© 2018–2026 EmpireCraft</span>
          <p>
            Not an official Minecraft service. Not approved by or associated
            with Mojang or Microsoft.
          </p>
        </div>
      </footer>
      <div className="sr-only" role="status" aria-atomic="true">
        {announcement}
      </div>
    </>
  );
}
