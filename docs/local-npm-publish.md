# NPM Publish from you local maschine

## Generate `dist`
```bash
npm run build
```

## Login to [Nexus](https://nexus.mind-consulting.de)
```bash
npm login --registry=https://nexus.mind-consulting.de/repository/npm-private/
username: jenkins
password: ****
email: info@mind-consulting.de
```

## Publish
```bash
npm publish
```
## Logout
```bash
npm logout --registry=https://nexus.mind-consulting.de/repository/npm-private/
```