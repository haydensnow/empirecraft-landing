"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const DISCORD_URL = "https://discord.gg/AtxJ6JNGTb";
const MAP_URL = "https://map.empirecraftmc.com/";
const SERVER_IP = "play.empirecraftmc.com";

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

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [copied, setCopied] = useState(false);

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
