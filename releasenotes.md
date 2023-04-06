## 0.8.0 - 06.04.2023

Add `wc-ladon-pdfviewer` to bundler

## 0.7.1 - 06.04.2023

Bump some minor package versions, add `@mind/mf-ladon-static-page`

## 0.7.0 - 06.04.2023

Updating all major package to latest

## 0.4.0 - 13.03.2023

The new version runs downloads and creates a `upload` folder including all needed plugins for new ladon instance setup

## 0.3.0 - 07.11.2022

Remove unnesecarry npm modules and export function `cleanup` and `run` from index.js so you can call 
separate, either from npm scripts or cli.

```bash
node -e 'import(\"./index.js\").then(module => module.run())'
```