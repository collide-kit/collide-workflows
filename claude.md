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
yarn fmt:check          # Check code formatting
yarn fmt:check:cache    # Check formatting (with cache)

# Format fixing
yarn fmt:fix            # Auto-fix formatting issues
yarn fmt:fix:cache      # Auto-fix formatting (with cache)

# Release management (using changesets)
yarn changeset          # Create a new changeset
yarn changeset:version  # Update versions based on changesets
yarn release            # Publish packages to npm
```

## Project Structure

This repository contains GitHub Actions composite actions organized in the `actions/` directory:

```text
collide-workflows/
├── .github/
│   └── workflows/
│       ├── test.yml              # Comprehensive testing (matrix, edge cases)
│       ├── release.yml           # Automated releases with changesets
│       ├── actions-up.yml        # Auto-update actions with SHA pinning
│       └── dependency-review.yml # Security scanning for dependencies
├── actions/
│   ├── prepare/                  # Main CI setup (combines all below)
│   │   └── action.yml
│   ├── setup-node/               # Node.js installation only
│   │   └── action.yml
│   ├── setup-yarn/               # Yarn setup via Corepack
│   │   └── action.yml
│   └── cache-deps/               # Dependency caching with 2-level strategy
│       └── action.yml
├── package.json                  # Project configuration & scripts
├── changelog.md                  # Version history
├── readme.md                     # Usage documentation
└── claude.md                     # This file
```

### Adding New Actions

Each composite action should:

1. Live in its own directory under `actions/` (e.g., `actions/prepare/`, `actions/release/`, etc.)
2. Contain an `action.yml` file with:
   - `name`: Action name
   - `description`: What the action does
   - `runs.using: composite`: Required for composite actions
   - `steps`: Array of steps to execute
3. Use `shell: bash` for any `run` steps in composite actions
4. Be documented in the main [README.md](README.md)

### Available Actions

#### **actions/prepare** (Main CI Setup)

Sets up complete CI environment with Node.js, Yarn, caching, and dependency installation.

**Inputs** (all optional):

- `node-version`: Node.js version to install (default: `latest`)
- `yarn-version`: Yarn version to install (default: `latest`)
- `enable-cache`: Enable dependency caching (default: `true`)
- `install-dependencies`: Run `yarn install --immutable` (default: `true`)

**Outputs**:

- `node-version`: Installed Node.js version
- `yarn-version`: Installed Yarn version
- `cache-hit`: Whether cache was restored (`true`/`false`)
- `yarn-cache-dir`: Path to Yarn cache directory
- `install-duration`: Dependency installation duration (in seconds)

**Features**:

- ✅ Automatic summary output in logs (users don't need to manually display info)
- ✅ Comprehensive error handling with diagnostics
- ✅ Performance metrics tracking
- ✅ Cache hit/miss reporting
- ✅ Cross-platform support (Ubuntu, macOS, Windows)
- ✅ Branding for GitHub Marketplace

**Implementation Details**:

- Uses `actions/setup-node@v6` for Node.js installation
- Uses Corepack (built into Node.js) for Yarn installation
- Implements improved two-level caching strategy:
  1. Yarn global cache (`yarn config get cacheFolder`)
  2. Local `node_modules` directory
- Enhanced cache key: `{os}-node-{node-version}-yarn-{yarn-version}-{hash(yarn.lock, package.json)}`
- Runs `yarn install --immutable` to ensure reproducible installs
- Displays automatic summary at the end with all key information

#### **actions/setup-node** (Modular)

Installs and configures Node.js only. Use when you need just Node.js without Yarn.

**Inputs**: `node-version` (default: `latest`)
**Outputs**: `node-version`

#### **actions/setup-yarn** (Modular)

Installs and configures Yarn via Corepack. Use when you already have Node.js set up.

**Inputs**: `yarn-version` (default: `latest`)
**Outputs**: `yarn-version`, `yarn-cache-dir`

#### **actions/cache-deps** (Modular)

Caches Yarn dependencies with two-level strategy. Use for custom caching scenarios.

**Inputs**: `enable-cache`, `yarn-cache-dir`, `node-version`, `yarn-version`
**Outputs**: `cache-hit`

### Automated Workflows

#### **test.yml** - Comprehensive Testing

- **Basic tests**: Default configuration validation
- **Matrix testing**: Multiple OS (Ubuntu, macOS, Windows) and Node.js versions (20.x, 22.x, latest)
- **Edge cases**: No cache, no install, custom versions, cache hit validation
- **Dynamic validation**: Yarn version checked against package.json automatically

#### **release.yml** - Automated Releases

- Creates Release PRs automatically when changesets are detected
- Updates versions via changesets
- Creates GitHub Releases (no npm publishing)
- Runs on push to main branch

#### **actions-up.yml** - Action Updates

- Automatically updates GitHub Actions to latest versions with SHA pinning
- Runs weekly (Mondays at 00:00 UTC)
- Creates PRs with updated action versions
- Ensures reproducible builds and security

#### **dependency-review.yml** - Security Scanning

- Scans dependencies for vulnerabilities in PRs
- Fails on moderate+ severity issues
- Automatically comments on PRs with findings
- Integrates with GitHub's dependency graph

## Release Process

This project uses [changesets](https://github.com/changesets/changesets) for version management:

1. **Create changeset**: `yarn changeset` (before committing changes)
   - Select package and bump type (major/minor/patch)
   - Write description for CHANGELOG
2. **Commit and push**: Changes with changeset file
3. **Automated PR**: Release workflow creates PR automatically
4. **Merge Release PR**: Updates version and CHANGELOG
5. **Create tag manually**: `git tag -a vX.X.X -m "Release vX.X.X" && git push origin vX.X.X`
6. **Create GitHub Release**: Manually or via `gh release create`

**Important**: This project does NOT publish to npm. GitHub Releases are the primary distribution method.

## Notes

- This workspace uses Yarn Berry (v4) with the `node-modules` linker strategy
- Environment-specific configuration should use `.env` files (not committed to version control)
- The project is MIT licensed
- All workflows use SHA pinning for official GitHub actions (actions/\*) with major version tags for simplicity
- Third-party actions use full SHA pinning for security
- Automated testing covers multiple OS and Node.js versions
- Documentation is comprehensive with examples for all use cases
