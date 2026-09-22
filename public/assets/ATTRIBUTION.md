# Asset sources

Retrieved 21 September 2026 for the EmpireCraft Minecraft community website.

## Minecraft game textures

The following unmodified 16 × 16 PNG textures are from Minecraft Java Edition 1.21.5, authored by Mojang/Microsoft and obtained from the public Minecraft Assets archive:

Base: https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.5/assets/minecraft/textures/

| Local file in `minecraft/`   | Upstream path                      |
| ---------------------------- | ---------------------------------- |
| dirt.png                     | block/dirt.png                     |
| stone.png                    | block/stone.png                    |
| grass_block_side.png         | block/grass_block_side.png         |
| grass_block_side_overlay.png | block/grass_block_side_overlay.png |
| oak_sapling.png              | block/oak_sapling.png              |
| diamond_pickaxe.png          | item/diamond_pickaxe.png           |
| compass_16.png               | item/compass_16.png                |
| book.png                     | item/book.png                      |

These are Minecraft assets, not assets licensed under this repository’s code license. Refer to the Minecraft Usage Guidelines: https://www.minecraft.net/en-us/usage-guidelines. This community site includes an explicit non-affiliation notice. The Minecraft logo and official website’s proprietary font binaries are not used.

## Fan-made Minecraft UI font

Author: Idrees Hassan. Source: https://github.com/IdreesInc/Minecraft-Font
Pinned commit: `261ac77fbf28796ca09c22eb83ecdfe386c4b838`.

`Minecraft.otf` and `Minecraft-Bold.otf` were converted to WOFF2 with fontTools without changing glyphs. Local files: `fonts/Minecraft-Regular.woff2` and `fonts/Minecraft-Bold.woff2`.

License: SIL Open Font License 1.1. Full copyright and license text are shipped in `fonts/Minecraft-LICENSE.txt`. This is an independent fan-made font, not a Mojang font.

## EmpireCraft screenshot

`images/hero-spawn-valley.png` was supplied in the existing repository. `images/hero-spawn-valley.webp` is a quality-85 WebP derivative made with Sharp. The image shows the EmpireCraft spawn; it is reused as a clearly labeled world preview, not represented as a map capture.

## Existing unused assets

The original PP Mondwest binaries and SVG wordmark remain in the repository but are no longer loaded by the landing page. Their original licensing requirements still apply independently.

## Social preview card

`/og-build-together.png` and the compatibility copy `/og.png` are 1200 × 630 screenshots rendered from `scripts/social-card.html` with headless Chromium. They use the same local Minecraft UI WOFF2 fonts, original spawn WebP, grass texture, colors, letter spacing, and headline as the website. These final social assets do not use AI-generated imagery or lettering.

To regenerate, run a local HTTP server from the repository root on port 8010, then:

```sh
npm exec --yes --package=playwright -- playwright screenshot --channel chrome --viewport-size '1200,630' --wait-for-selector 'body.ready' http://127.0.0.1:8010/scripts/social-card.html public/og-build-together.png
cp public/og-build-together.png public/og.png
```

The page waits for the local fonts and screenshot image before capture. Google Chrome must be installed for the command above.
