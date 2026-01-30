# collide-workflows

## 1.0.0

### Major Changes

- Initial release of collide-workflows library

  This is the first release of the collide-workflows library, which provides reusable GitHub Actions composite actions for the collide-eslint ecosystem.

  ### Features
  - **actions/prepare**: Sets up CI environment with Node.js, Yarn 4.12.0 via Corepack, and installs dependencies with caching
    - Two-level caching strategy for optimal performance (Yarn cache + node_modules)
    - Immutable installs for reproducible builds
