# ⚫ @collide-kit/collide-workflows

[![CI](https://github.com/collide-kit/collide-workflows/actions/workflows/test.yml/badge.svg)](https://github.com/collide-kit/collide-workflows/actions/workflows/test.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Reusable GitHub Actions composite actions for **CollideKit** projects. This library provides standardized, battle-tested CI/CD workflows with intelligent caching, comprehensive error handling, and performance metrics.

## 📦 Actions

### `actions/prepare`

Sets up a complete CI environment with Node.js, Yarn Berry, and intelligent two-level dependency caching.

**Features:**

- ✅ Configurable Node.js and Yarn versions
- ✅ Two-level caching (Yarn global cache + node_modules)
- ✅ Immutable dependency installation for reproducibility
- ✅ Comprehensive error handling and logging
- ✅ Performance metrics tracking
- ✅ Cache hit/miss reporting
- ✅ Cross-platform support (Ubuntu, macOS, Windows)

#### Inputs

| Name                   | Description                                  | Default  | Required |
| ---------------------- | -------------------------------------------- | -------- | -------- |
| `node-version`         | Node.js version to install                   | `latest` | ❌       |
| `yarn-version`         | Yarn version to install                      | `latest` | ❌       |
| `enable-cache`         | Enable dependency caching                    | `true`   | ❌       |
| `install-dependencies` | Run `yarn install --immutable` automatically | `true`   | ❌       |

#### Outputs

| Name               | Description                                   |
| ------------------ | --------------------------------------------- |
| `node-version`     | Installed Node.js version                     |
| `yarn-version`     | Installed Yarn version                        |
| `cache-hit`        | Whether cache was restored (`true`/`false`)   |
| `yarn-cache-dir`   | Path to Yarn cache directory                  |
| `install-duration` | Dependency installation duration (in seconds) |

#### Examples

<details>
<summary><strong>Basic Usage</strong></summary>

```yaml
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1

      - run: yarn build
      - run: yarn test
```

</details>

<details>
<summary><strong>Custom Node.js Version</strong></summary>

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1
        with:
          node-version: '20.18.1'

      - run: yarn build
```

</details>

<details>
<summary><strong>Custom Yarn Version</strong></summary>

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1
        with:
          yarn-version: '4.12.0'

      - run: yarn install
      - run: yarn build
```

</details>

<details>
<summary><strong>Using Outputs</strong></summary>

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6

      - name: Setup CI
        id: setup
        uses: collide-kit/collide-workflows/actions/prepare@v1

      - name: Display setup info
        run: |
          echo "Node.js: ${{ steps.setup.outputs.node-version }}"
          echo "Yarn: ${{ steps.setup.outputs.yarn-version }}"
          echo "Cache hit: ${{ steps.setup.outputs.cache-hit }}"
          echo "Install took: ${{ steps.setup.outputs.install-duration }}s"

      - run: yarn build
```

</details>

<details>
<summary><strong>Without Caching</strong></summary>

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1
        with:
          enable-cache: 'false'

      - run: yarn build
```

</details>

<details>
<summary><strong>Setup Tools Only (Skip Installation)</strong></summary>

```yaml
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1
        with:
          install-dependencies: 'false'

      - run: yarn install --frozen-lockfile
      - run: yarn build
```

</details>

<details>
<summary><strong>Matrix Testing</strong></summary>

```yaml
jobs:
  test:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node-version: ['20.x', '22.x', 'latest']
    runs-on: ${{ matrix.os }}
    steps:
      - uses: actions/checkout@v6
      - uses: collide-kit/collide-workflows/actions/prepare@v1
        with:
          node-version: ${{ matrix.node-version }}

      - run: yarn test
```

</details>

## 🔧 How It Works

### Caching Strategy

The `actions/prepare` action implements a sophisticated two-level caching strategy:

1. **Yarn Global Cache**: Stores downloaded packages (from `yarn config get cacheFolder`)
2. **Local node_modules**: Caches installed dependencies

**Cache Key Format:**

```
{os}-node-{node-version}-yarn-{yarn-version}-{hash(yarn.lock, package.json)}
```

This ensures cache invalidation when:

- Operating system changes
- Node.js version changes
- Yarn version changes
- Dependencies change (yarn.lock or package.json modified)

### Installation Process

1. Setup Node.js via `actions/setup-node`
2. Enable Corepack (built into Node.js)
3. Prepare and activate specified Yarn version via Corepack
4. Retrieve Yarn cache directory path
5. Restore cache if available
6. Install dependencies with `yarn install --immutable`
7. Report performance metrics and cache status

## 🐛 Troubleshooting

<details>
<summary><strong>Cache not being restored</strong></summary>

**Possible causes:**

- First run on a new branch (expected)
- `yarn.lock` or `package.json` changed
- Node.js or Yarn version changed
- Cache expired (GitHub caches expire after 7 days of inactivity)

**Solution:**

Check the action logs for "Cache not found" message. This is normal for first runs.

</details>

<details>
<summary><strong>Installation fails with "Immutable install failed"</strong></summary>

**Cause:** `yarn.lock` is out of sync with `package.json`

**Solution:**

Run locally:

```bash
yarn install
git add yarn.lock
git commit -m "chore: update yarn.lock"
```

</details>

<details>
<summary><strong>Wrong Node.js or Yarn version installed</strong></summary>

**Solution:**

Explicitly specify versions:

```yaml
- uses: collide-kit/collide-workflows/actions/prepare@v1
  with:
    node-version: '20.18.1'
    yarn-version: '4.12.0'
```

</details>

## 🚀 Development

### Prerequisites

- Node.js 25.5.0 (see `.nvmrc`)
- Yarn 4.12.0 (Berry)

### Setup

```bash
# Install Node.js version
nvm use

# Install dependencies
yarn install
```

### Available Scripts

```bash
# Format checking
yarn fmt:check          # Check code formatting
yarn fmt:check:cache    # Check formatting (with cache)

# Format fixing
yarn fmt:fix            # Auto-fix formatting issues
yarn fmt:fix:cache      # Auto-fix formatting (with cache)

# Release management (using changesets)
yarn changeset          # Create a new changeset
yarn changeset:version  # Update versions based on changesets
yarn release            # Publish packages
```

### Testing

The project includes comprehensive test coverage in `.github/workflows/test.yml`:

- ✅ Basic functionality tests
- ✅ Matrix testing (multiple OS and Node versions)
- ✅ Cache behavior validation
- ✅ Edge cases (no cache, no install, custom versions)
- ✅ Output verification

Run tests via:

```bash
# Trigger test workflow
git push origin main
```

## 📖 Related Projects

- [CollideKit](https://github.com/collide-kit) - Main organization
- [actions/setup-node](https://github.com/actions/setup-node) - Official Node.js setup action
- [actions/cache](https://github.com/actions/cache) - Official caching action
- [Yarn Berry](https://yarnpkg.com/) - Modern package manager

## 📄 License

MIT © 2026 CollideKit

---

**Made with ⚫ by [gratisv](https://github.com/gratisv)**
