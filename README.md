# ForthBox Frontend

ForthBox Frontend is the Vue 3 web client for the ForthBox ecosystem. It brings together marketplace, GameFi, DeFi, NFT minting, campaign, and account-management flows in a single Web3-enabled application.

This repository contains the production frontend used to connect users with ForthBox services, smart-contract interactions, multilingual content, and environment-specific backend endpoints.

## Overview

The application is organized as a modular single-page app built on Vue CLI. It includes:

- NFT marketplace experiences
- Game center and game-related pages
- DeFi and staking flows
- NFT minting pages
- Invite, share, FAQ, and promotional pages
- Settings and account-management areas
- Admin-facing routes
- Web3 wallet and contract integrations

Routing is hash-based and assembled from multiple route modules under `src/router`.

## Tech Stack

- Vue 3
- Vue Router 4
- Vue I18n 9
- Axios
- Web3.js
- WalletConnect
- SCSS
- Vue CLI 4
- Docker with Nginx Alpine for static deployment

## Key Capabilities

- Multi-module frontend covering marketplace, GameFi, DeFi, and campaign scenarios
- Built-in multilingual support for English, Simplified Chinese, Traditional Chinese, Korean, Vietnamese, and Russian
- Wallet integration through Web3.js and WalletConnect
- Environment-specific API and service endpoint configuration
- Reusable plugin layer for HTTP, i18n, validation, and modal behavior
- Smart-contract wrappers and ABI files under `src/web3`

## Requirements

- Node.js 12 or later
- Yarn 1.x

If you plan to build for production or staging, use the same Node/Yarn versions as the deployment pipeline to avoid lockfile drift or CLI incompatibilities.

## Quick Start

### 1. Install dependencies

```bash
yarn install
```

### 2. Start the local development server

```bash
yarn serve
```

By default, the app uses the Vue dev server and the proxy rules declared in `vue.config.js`.

### 3. Expose the dev server to your local network

```bash
yarn serve:host
```

Use this mode when QA or another device on the same network needs to access your local instance.

### 4. Build the production bundle

```bash
yarn build
```

### 5. Build the gamma bundle

```bash
yarn gamma
```

### 6. Lint the project

```bash
yarn lint
```

### 7. Check i18n usage

```bash
yarn i18n:report
```

This command scans source files and locale files for translation coverage issues.

## Available Scripts

| Command | Description |
| --- | --- |
| `yarn serve` | Start the local dev server |
| `yarn serve:host` | Start the dev server on `0.0.0.0` |
| `yarn build` | Build the production bundle |
| `yarn gamma` | Build using the `gamma` mode |
| `yarn lint` | Run ESLint |
| `yarn i18n:report` | Generate a translation usage report |

## Environment Configuration

The project uses Vue CLI environment files:

| File | Purpose |
| --- | --- |
| `.env` | Shared default values such as i18n locale fallback |
| `.env.development` | Local development endpoints |
| `.env.gamma` | Gamma or staging-style build configuration |
| `.env.production` | Production endpoints |

### Current environment variables used in this repository

| Variable | Description |
| --- | --- |
| `VUE_APP_I18N_LOCALE` | Default active locale |
| `VUE_APP_I18N_FALLBACK_LOCALE` | Locale fallback when a key is missing |
| `VUE_APP_API_URL` | Main backend API entry |
| `VUE_APP_API_V2_URL` | Secondary or v2 API base URL |
| `VUE_APP_API_FBOX2` | ForthBox v2 backend service |
| `VUE_APP_UCENTER_HOST` | User center host |
| `VUE_APP_GAME_URL` | Game center backend |
| `VUE_APP_SPACE_WAR_URL` | Space War service endpoint |
| `VUE_APP_HAM_FANTASY_URL` | Ham Fantasy service endpoint |
| `VUE_APP_REQUEST_TIMEOUT` | Request timeout in milliseconds |

### Notes

- `src/plugins/i18n.js` reads locale values from `.env`.
- Development requests may also be forwarded through `devServer.proxy` in `vue.config.js`.
- Keep environment files aligned with the backend deployment targets before releasing.

## Development Notes

### Dev proxy

The local dev server proxies several API paths, including:

- `/web/`
- `/users/`
- `/market/get_nft_level`
- `/market/get_list`
- `/artwork/get_history`
- `/gamecenter/`
- `/buy/open_xbox`
- `/ops/home/`

These mappings are defined in `vue.config.js` and help local development avoid cross-origin issues.

### Web3 bootstrap

The application initializes wallet and contract-related modules from `src/main.js`, including:

- `@/web3/wallet`
- `@/web3/HamNFT`
- `@/web3/HamStake`

It also exposes `Web3`, `WalletConnect`, `QRCodeModal`, and `WalletConnectProvider` on `window` for runtime access.

### Routing

- The app uses `createWebHashHistory()`.
- Feature routes are split across multiple route files such as `game.routes`, `market.routes`, `difi.routes`, `promo.routes`, and `admin.routes`.
- Route metadata is used to control the browser title.

## Project Structure

```text
src/
|-- assets/       Static assets such as images and fonts
|-- common/       Shared styles and utility code
|-- components/   Reusable UI components
|-- helpers/      Cross-cutting helper functions
|-- layouts/      Layout wrappers
|-- locales/      Translation JSON files
|-- mixins/       Shared Vue mixins
|-- models/       Data models and API-related abstractions
|-- modules/      Shared domain modules
|-- plugins/      App plugins for axios, i18n, modal, and validation
|-- router/       Route assembly and feature route modules
|-- views/        Page-level screens
|-- web3/         Smart-contract wrappers, wallet logic, and ABI files
|-- App.vue       Root component
`-- main.js       Application bootstrap
```

### Major view groups

The `src/views` directory currently includes modules such as:

- `Admin`
- `DeFi`
- `Faq`
- `Game2`
- `Games`
- `Home`
- `Invite`
- `Market`
- `Market2`
- `Minting`
- `Promo`
- `Recruit`
- `Settings`
- `Share`

## Localization

Supported locales currently loaded by the app:

- `en`
- `zh-CN`
- `zh-TW`
- `ko`
- `vn`
- `ru`

Translation files live in `src/locales/*.json`. Run `yarn i18n:report` before merging changes that introduce or rename translation keys.

## Build and Deployment

### Docker image

```bash
yarn build
docker build -t forthbox-fe .
docker run -p 80:80 forthbox-fe
```

The included `Dockerfile` packages the built static assets with Nginx Alpine.

### Deployment expectations

- Build artifacts are static files generated by Vue CLI
- Production routing relies on hash history, which reduces server rewrite requirements
- Environment-specific values must be correct at build time

## Maintenance Guidance

- Keep `src/web3` contract wrappers and ABI files synchronized with backend and on-chain changes
- Review `vue.config.js` proxy targets when backend domains change
- Update locale JSON files together when shared copy changes
- Run linting and i18n checks before release builds
- Verify environment files before building `gamma` or `production`

## Repository Purpose

This repository is focused on the frontend application only. It does not include backend services, smart-contract deployment logic, or infrastructure provisioning.
