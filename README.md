# ⚫ @collide-kit/collide-workflows

Reusable GitHub Actions composite actions for **collide** projects.

## 🚀 Usage

### `actions/prepare`

Sets up a CI environment with Node.js, Yarn, and dependency caching.

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
      - uses: collide-kit/collide-workflows/actions/prepare@v1.0.0

      - run: yarn build
      - run: yarn test
```

## 📄 License

MIT
