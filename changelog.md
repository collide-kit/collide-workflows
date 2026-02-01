# ⚫ @collide-kit/collide-workflows

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
