# Ladon UI Bundler

## Getting started
```bash
npm i
```

## Bundle
This script bundles all needed micro frontends from `node_modules` into a `dist` folder and generates a named [zip file](zipper.mjs)

```bash
npm run bundle:npm
npm run bundle:tgz
```

## Cleanup
Deletes `dist` folder and any generated files
```bash
npm run cleanup
```

## Download for local usage

```bash
npm pack @mind/ladon-frontend-bundler
```

---

### Further reading
- [Publish your npm package from local machine](docs/local-npm-publish.md)
- [Semantic commits](https://gist.github.com/joshbuchea/6f47e86d2510bce28f8e7f42ae84c716)
