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

