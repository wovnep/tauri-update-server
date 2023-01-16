# Tauri update server

Server to update your tauri app. Supports github public/private repositories.

## Docker

#### Image:

```
docker pull wovnep/tauri-update-server:latest
```

#### Docker compose usage:

```yaml
services:
  updater:
    container_name: updater
    image: wovnep/tauri-update-server
    ports:
      - "3000:8080"
    environment:
      - USERNAME=wovnep
      - REPO=tauri-updater
      - API_KEY=${API_KEY}
      - DEFAULT_LANG=en-US
      - SIGNATURE=true
```
## Environment variables

|Name					|Required			|Description	|
| ----------- | ----------- | ----------- |
|USERNAME			|true					|Github username/repo owner|
|REPO					|true					|Github repository of the project|
|API_KEY			|false				|[Personal access token](https://github.com/settings/tokens). Default: false|
|DEFAULT_LANG |true(windows)|Windows default language app build in. Default: en-US|
|SIGNATURE		|false				|If you enabled signature enable this. Default: false

## Development

**Build**
```
npm run build
```

**Dev**
```
npm run dev
```