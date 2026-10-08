# Crucible Rhythm

An Owlbear Rodeo extension for D&D boss encounters featuring entanglement mechanics and interactive rhythm challenges.

## Requirements

- Node.js
- npm
- GitHub Codespaces (recommended)
- Owlbear Rodeo

## Setup

Install project dependencies:

```bash
npm install
```

Install the Owlbear Rodeo SDK if needed:

```bash
npm install @owlbear-rodeo/sdk
```

## Commands

**Run the development server**

```bash
npm run dev
```

**Build the extension**

```bash
npm run build
```

The compiled extension files will be generated in the `dist/` folder.

**Preview the production build**

```bash
npm run preview
```

**Stop the running server**

Press `Ctrl + C` in the terminal.

## GitHub Commands

**Check changes**

```bash
git status
```

**Stage all changes**

```bash
git add .
```

**Commit changes**

```bash
git commit -m "Describe your changes"
```

**Push to GitHub**

```bash
git push origin main
```

**Get the latest commit hash**

```bash
git rev-parse HEAD
```

## Deploying to Owlbear Rodeo

1. Run `npm run build`.
2. Commit and push the updated `dist/` folder to GitHub.
3. Get the latest commit hash.
4. Use the jsDelivr URL below, replacing `COMMIT_HASH` with your hash.

```text
https://cdn.jsdelivr.net/gh/crusader-source/crucible-rhythm@COMMIT_HASH/dist/manifest.json
```

5. Add or update the extension in Owlbear Rodeo using the manifest URL.

**Note:** Use commit hashes instead of `@main` to avoid jsDelivr caching issues. Ensure that the manifest's asset and popover URLs also point to the correct deployed build.

## Project Roadmap

- [x] Create GitHub repository
- [x] Set up Vanilla JavaScript and Vite
- [x] Connect extension to Owlbear Rodeo
- [ ] GM control panel with player selection
- [ ] Entanglement and three-turn countdown
- [ ] Player communication system
- [ ] Fullscreen rhythm challenge
- [ ] Arrow-key rhythm gameplay
- [ ] Send challenge results to GM