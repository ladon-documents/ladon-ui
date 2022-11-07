## 0.3.0 - 07.11.2022

Remove unnesecarry npm modules and export function `cleanup` and `run` from index.js so you can call 
separate, either from npm scripts or cli.

```bash
node -e 'import(\"./index.js\").then(module => module.run())'
```

## 0.2.0
