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
├── actions/
│   └── prepare/        # CI preparation composite action
│       └── action.yml  # Action definition with caching
├── package.json        # Project configuration & scripts
├── README.md           # Usage documentation
└── CLAUDE.md          # This file
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

**actions/prepare**: Sets up CI environment with Node.js and Yarn, caches dependencies, and installs packages.

**Inputs** (all optional):

- `node-version`: Node.js version to install (default: `latest`)
- `yarn-version`: Yarn version to install (default: `latest`)
- `enable-cache`: Enable dependency caching (default: `true`)
- `install-dependencies`: Run `yarn install --immutable` (default: `true`)

**Implementation Details**:

- Uses `actions/setup-node@v6` for Node.js installation
- Uses Corepack (built into Node.js) for Yarn installation
- Implements two-level caching strategy:
  1. Yarn global cache (`yarn config get cacheFolder`)
  2. Local `node_modules` directory
- Cache key includes OS and `yarn.lock` hash
- Runs `yarn install --immutable` to ensure reproducible installs

## Notes

- This workspace uses Yarn Berry (v4) with the `node-modules` linker strategy
- Environment-specific configuration should use `.env` files (not committed to version control)
- The project is MIT licensed
