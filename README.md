# collide-workflows

Reusable GitHub Actions composite actions for collide projects.

## Usage

### actions/prepare

Sets up CI environment with Node.js, Yarn 4.12.0, and dependency caching.

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
      - uses: actions/checkout@v4
      - uses: collide-eslint/collide-workflows/actions/prepare@main

      - run: yarn build
      - run: yarn test
```

### Pin to version

```yaml
- uses: collide-eslint/collide-workflows/actions/prepare@v1.0.0
```

### Pin to commit

```yaml
- uses: collide-eslint/collide-workflows/actions/prepare@abc1234
```

## License

MIT
