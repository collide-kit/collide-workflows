# ⚫ @collide-kit/collide-workflows

## 1.3.0 🔄

### Minor Release

🔐 **Enhanced GitHub Actions security with latest versions and automated updates**

This release updates all GitHub Actions to their latest versions with SHA pinning for improved security. The actions-up workflow has been refactored to use the CLI tool directly, enabling automatic updates for both workflows and composite actions.

### 🔄 Dependency Updates

#### **Updated GitHub Actions**

- **actions/checkout** — Updated to v6.0.1 with SHA pinning
- **actions/setup-node** — Updated to v6.2.0 with SHA pinning
- **peter-evans/create-pull-request** — Updated to v8.1.0 with SHA pinning

### 🔧 Workflow Improvements

#### **Refactored actions-up Workflow**

- **CLI Integration** — Switched from non-existent GitHub Action to official CLI tool
  - Setup Node.js environment
  - Install actions-up via npm
  - Run updates programmatically
- **Expanded Coverage** — Now updates actions in both locations:
  - `.github/workflows/` — Workflow files
  - `actions/` — Composite action files
- **Automated Updates** — Smart iteration through composite actions directories
- **PAT Token Support** — Uses Personal Access Token for workflow file modifications

### 🔐 Security

- **SHA Pinning** — All actions now use commit SHAs with version comments
- **Reproducible Builds** — Pinned SHAs ensure consistent behavior
- **Tag Manipulation Protection** — Prevents security risks from tag changes

---

## 1.2.0 ✨

### Minor Release

🎯 **Enhanced user experience with automatic CI environment summary**

This release improves the developer experience by automatically displaying CI environment information without requiring manual output configuration. All key metrics are now shown in logs by default, while outputs remain available for advanced conditional workflow logic.

### ✨ New Features

#### **Automatic Summary Output**

- **Auto-Display** — CI environment summary automatically shown at the end of `actions/prepare`
  - Node.js version
  - Yarn version
  - Cache status (HIT/MISS)
  - Installation duration
- **Visual Format** — Clean, bordered summary box for easy readability
- **Zero Configuration** — Works out of the box, no manual steps required
- **Conditional Display** — Smart display based on enabled features (cache, install)

#### **Enhanced Documentation**

- **Clarified Outputs Usage** — Updated "Using Outputs (Advanced)" section in readme.md
  - Emphasized automatic display behavior
  - Clarified that outputs are for conditional logic only
  - Added practical examples of output-based workflows
- **Updated Architecture Guide** — Enhanced claude.md with:
  - Complete project structure overview
  - Detailed action descriptions
  - Automated workflows documentation
  - Release process guide

---

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
