# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@collide-kit/collide-workflows` is a library of reusable GitHub Actions composite actions for CollideKit projects. It provides standardized CI/CD workflows that can be referenced from other repositories.

## Development Environment

- **Node Version**: 25.5.0 (specified in [.nvmrc](.nvmrc))
- **Package Manager**: Yarn 4.12.0 (Yarn Berry with node-modules linker)
- **Module System**: ES Modules (`"type": "module"` in package.json)

## Common Commands

```bash
# Install dependencies
yarn

# Format checking
yarn fmt:check          # Check formatting
yarn fmt:check:cache    # Check formatting (with cache)

# Format fixing
yarn fmt:fix            # Auto-fix formatting
yarn fmt:fix:cache      # Auto-fix formatting (with cache)
```

## Project Structure

```text
collide-workflows/
├── .github/
│   └── workflows/
│       └── test.yml              # Matrix testing (OS × Node versions, edge cases)
├── actions/
│   ├── prepare/                  # Main CI setup (Node.js + Yarn + cache + install)
│   │   └── action.yml
│   ├── setup-node/               # Node.js installation only
│   │   └── action.yml
│   ├── setup-yarn/               # Yarn setup via Corepack
│   │   └── action.yml
│   └── cache-deps/               # Dependency caching (two-level strategy)
│       └── action.yml
├── package.json
├── prettier.config.ts
├── renovate.json                 # Renovate config for automated dependency updates
├── changelog.md
├── readme.md
└── CLAUDE.md                     # This file
```

### Adding New Actions

Each composite action should:

1. Live in its own directory under `actions/` (e.g., `actions/prepare/`)
2. Contain an `action.yml` with `runs.using: composite`
3. Use `shell: bash` for all `run` steps
4. Be documented in [readme.md](readme.md)

## Available Actions

### **actions/prepare** (Main CI Setup)

Sets up the complete CI environment: Node.js, Yarn (Corepack), caching, dependency installation.

**Inputs** (all optional):

| Input                  | Default  | Description                    |
| ---------------------- | -------- | ------------------------------ |
| `node-version`         | `latest` | Node.js version                |
| `yarn-version`         | `latest` | Yarn version                   |
| `enable-cache`         | `true`   | Enable two-level caching       |
| `install-dependencies` | `true`   | Run `yarn install --immutable` |

**Outputs**:

| Output             | Description                                 |
| ------------------ | ------------------------------------------- |
| `node-version`     | Installed Node.js version                   |
| `yarn-version`     | Installed Yarn version                      |
| `cache-hit`        | Whether cache was restored (`true`/`false`) |
| `yarn-cache-dir`   | Yarn cache directory path                   |
| `install-duration` | Installation time in seconds                |

**Implementation**:

- `actions/setup-node@6044e13b5dc448c55e2357c09f80417699197238` (`v6.2.0`) for Node.js
- Corepack for Yarn installation
- Two-level cache via `actions/cache@cdf6c1fa76f9f475f3d7449005a359c84ca0f306` (`v5.0.3`):
  1. Yarn global cache (`yarn config get cacheFolder`)
  2. Local `node_modules`
- Cache key: `{os}-node-{node-version}-yarn-{yarn-version}-{hash(yarn.lock, package.json)}`
- Automatic summary printed at end of action

### **actions/setup-node** (Modular)

Node.js installation only. **Inputs**: `node-version`. **Outputs**: `node-version`.

### **actions/setup-yarn** (Modular)

Yarn via Corepack. **Inputs**: `yarn-version`. **Outputs**: `yarn-version`, `yarn-cache-dir`.

### **actions/cache-deps** (Modular)

Two-level dependency caching. **Inputs**: `enable-cache`, `yarn-cache-dir`, `node-version`, `yarn-version`. **Outputs**: `cache-hit`.

## Workflows

### **test.yml**

Triggers on push/PR to `main`. Jobs:

- `test-default` — default config + format check (`yarn fmt:check`)
- `test-matrix` — Ubuntu / macOS / Windows × Node.js `20.x` / `22.x` / `24.x` / `latest`
- `test-no-cache` — `enable-cache: false`
- `test-no-install` — `install-dependencies: false`
- `test-custom-versions` — Node `20.18.1` + Yarn `4.12.0`
- `test-cache-hit` — two consecutive runs to verify cache hit

Uses `actions/checkout@de0fac2e4500dabe0009e67214ff5f5447ce83dd` (`v6.0.2`) with SHA pinning.

### Dependency Updates

Managed by **Renovate** (`renovate.json`) — extends `github>collide-kit/collide-renovate` with automerge enabled.

## Release Process

1. Update `version` in `package.json`
2. Add entry to `changelog.md`
3. Commit and push to `main`
4. Create a GitHub Release tag: `git tag -a vX.X.X -m "vX.X.X" && git push origin vX.X.X`

**Note**: This project does NOT publish to npm.

## Notes

- All actions use SHA pinning for reproducible builds
- Yarn Berry (v4) with `node-modules` linker
- MIT licensed (`license.md`)
