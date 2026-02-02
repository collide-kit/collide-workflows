# ⚫ @collide-kit/collide-workflows

## 1.1.0 ✨

### Minor Release

🚀 **Comprehensive workflow improvements with enhanced functionality and modularity**

This release significantly expands the capabilities of **@collide-kit/collide-workflows** with action outputs, advanced testing, modular architecture, and automated workflows.

### ✨ New Features

#### **Enhanced `actions/prepare`**

- **Outputs Support** — Now returns useful information:
  - `node-version` — Installed Node.js version
  - `yarn-version` — Installed Yarn version
  - `cache-hit` — Whether cache was restored
  - `yarn-cache-dir` — Yarn cache directory path
  - `install-duration` — Installation time in seconds
- **Branding** — GitHub Marketplace integration with icon and color
- **Improved Caching** — Cache keys now include Node/Yarn versions and package.json hash
- **Cache Status Reporting** — Clear messages about cache hit/miss
- **Error Handling** — Detailed diagnostics when installation fails
- **Performance Metrics** — Automatic time tracking for dependency installation

#### **Comprehensive Testing**

- **Matrix Testing** — Tests across multiple OS (Ubuntu, macOS, Windows)
- **Node.js Version Matrix** — Tests with Node.js 20.x, 22.x, and latest
- **Dynamic Validation** — Yarn version checked against package.json automatically
- **Edge Case Coverage**:
  - Without caching (`enable-cache: false`)
  - Without installation (`install-dependencies: false`)
  - Custom Node/Yarn versions
  - Cache hit verification

#### **Modular Composite Actions**

New reusable building blocks for workflow composition:

- **`actions/setup-node`** — Node.js installation only
- **`actions/setup-yarn`** — Yarn setup via Corepack
- **`actions/cache-deps`** — Dependency caching with two-level strategy

#### **Automated Workflows**

- **Release Workflow** — Automatic version management with changesets
  - Creates release PRs automatically
  - Generates GitHub Releases
  - No npm publishing (as intended)
- **Dependency Review** — Security scanning on pull requests
  - Fails on moderate+ vulnerabilities
  - Automatic PR comments with findings
- **Actions Up** — Automated GitHub Actions updates
  - Weekly schedule (Mondays)
  - SHA pinning for security
  - Automatic PR creation

### 📚 Documentation

- **Expanded README** — Grew from 34 to ~280 lines
- **7 Usage Examples** — Covering all common scenarios
- **Troubleshooting Section** — Solutions for common problems
- **How It Works** — Detailed explanation of caching strategy

### 🔐 Security

- **SHA Pinning** — All new workflows use commit SHAs
- **Dependency Review** — Automatic vulnerability scanning
- **Automated Updates** — Actions-up keeps dependencies current

---

## 1.0.0 🚀

### Major Release

🎉 **Initial release of `@collide-kit/collide-workflows`**

The first stable release of the **@collide-kit/collide-workflows** library — a collection of reusable GitHub Actions designed for the **@collide-kit** ecosystem.

### ✨ Features

- **`actions/prepare`** — CI environment setup
  - Node.js setup with **Yarn Latest** via Corepack
  - Dependency installation with smart caching
  - ⚡ Two-level cache strategy (Yarn cache + `node_modules`)
  - 🔒 Immutable installs for reproducible builds
