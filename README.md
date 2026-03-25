# kiernan.dev — SSH Terminal Portfolio

A personal portfolio that runs entirely as a terminal UI, accessed over SSH. No browser, no JavaScript bundle, no web framework — visitors connect directly via `ssh -p 2222 guest@kiernan-devane-personal.fly.dev` and land in a fully interactive, keyboard-navigable interface built with React.

```
ssh -p 2222 guest@kiernan-devane-personal.fly.dev
```

---

## Why This Approach

Most developer portfolios are static sites. This one is a live process running in a container. The goal was to build something that demonstrates systems thinking alongside front-end polish — the deployment model, the PTY environment, the containerization, and the UX are all part of the project itself.

It also just looks cool.

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| UI framework | [Ink](https://github.com/vadimdemedes/ink) v5 | React-based component model for terminal UIs |
| Language | TypeScript | Type-safe components compiled to ESM |
| Name banner | [figlet](https://www.npmjs.com/package/figlet) — Epic font | ASCII art rendered with an animated rainbow wave |
| Profile photo | Pre-generated braille ASCII art via [`ascii-image-converter`](https://github.com/TheZoraiz/ascii-image-converter) | One-time asset generation; committed to repo |
| SSH server | OpenSSH inside Docker | `guest` user with the compiled Ink app set as the login shell |
| Deployment | [Fly.io](https://fly.io) — TCP port 22, shared VM | Raw TCP exposed globally, no HTTP layer |
| Container | Docker — `node:20-alpine` | Minimal image with SSH daemon as PID 1 |

---

## Architecture

The application has no web server, no WebSocket layer, and no client-side code. The entire stack is:

```
visitor's terminal
      │
      │  ssh -p 2222 guest@kiernan-devane-personal.fly.dev
      ▼
  Fly.io TCP proxy  (port 22)
      │
      ▼
  Docker container
  └── sshd
       └── login shell → node dist/app.js   ← Ink TUI runs here
```

When a visitor connects, OpenSSH spawns `dist/app.js` as the login shell directly attached to their PTY. The Ink app reads terminal dimensions, renders to the PTY, and receives keyboard input through standard stdin — no intermediary process.

On disconnect or `q`, the process exits cleanly and the SSH session closes.

---

## Features

- **Animated header** — figlet name banner with a scrolling HSL rainbow wave, computed per-frame using a custom `hslToHex` conversion and `setInterval` in a React effect
- **Responsive layout** — profile photo is conditionally hidden below 90 columns to prevent layout distortion on narrow terminals
- **Alternate screen mode** — enters a separate terminal buffer on launch (like vim or htop), restoring the previous session on exit
- **Keyboard navigation** — `←` `→` or `Tab` cycles sections; `↑` `↓` scrolls the Experience list; `q` exits
- **No runtime dependencies on the server** — ASCII art is pre-generated and committed; the Docker image carries only production `node_modules`

---

## Project Structure

```
personal_website/
├── src/
│   ├── app.tsx                  # Root component — alternate screen, nav state, routing
│   └── components/
│       ├── Header.tsx           # Figlet banner + ASCII photo + animated colors
│       ├── Experience.tsx       # Two-pane list: sidebar nav + detail view
│       └── Contact.tsx          # Keyboard shortcut hints with links
├── assets/
│   ├── profile.txt              # Pre-generated braille ASCII art (committed)
│   └── personal_website_image.png
├── Dockerfile                   # node:20-alpine + openssh, guest shell = Ink app
├── fly.toml                     # Fly.io TCP service, port 22
├── tsconfig.json
└── package.json
```

---

## Local Development

```bash
# Install dependencies
npm install

# Compile TypeScript
npx tsc

# Run the TUI directly in your local terminal
node dist/app.js

# Test the full SSH flow via Docker
docker build -t tui-site .
docker run -p 2222:22 tui-site
ssh guest@localhost -p 2222   # press Enter for password
```

**Regenerating the profile photo** (requires [`ascii-image-converter`](https://github.com/TheZoraiz/ascii-image-converter)):
```bash
ascii-image-converter assets/personal_website_image.png -d 16,12 -b > assets/profile.txt
```

---

## Deployment

```bash
fly launch    # first time — provisions the app on Fly.io
fly deploy    # subsequent deploys
```

Fly.io exposes TCP port 22 directly via its Anycast network, routing visitors to the nearest region.

---

## Dependencies

```json
{
  "dependencies": {
    "figlet": "^1.7.0",
    "ink": "^5.0.0",
    "react": "^18.0.0"
  }
}
```

Three runtime dependencies. The SSH server, PTY handling, and terminal rendering are all handled by the OS and the Ink framework respectively.
