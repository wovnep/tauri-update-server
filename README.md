# Tauri update server

Server to update your tauri app. Supports github public/private repositories.

## Usage

```bash
git clone https://github.com/wovnep/tauri-update-server.git
cd tauri-update-server
npm install
npm run build && npm start
```

In `tauri.conf.json`
Replace http://localhost:8080 with your hostname. Make sure to add all the query parameters.
```json
  ...
  "updater": {
    "active": true,
    "endpoints": [
      "http://localhost:8080/update?current_version={{current_version}}&target={{target}}&arch={{arch}}"
      ],
    "dialog": true,
    "pubkey": "xxx"
  }
  ...
```

## Docker

#### Image:

```
docker pull wovnep/tauri-update-server:latest
```

#### CLI usage:

```bash
docker run \
  -e USERNAME='user' \
  -e REPO='repository' \
  -e TAG_STRUCTURE='v' \
  -e API_KEY='xxxxxxxx' \
  -e DEFAULT_LANG='en-US' \
  -e SIGNATURE='true' \
  wovnep/tauri-update-server:latest
```

#### Docker compose:

```yaml
services:
  update-server:
    container_name: Tauri update server
    image: wovnep/tauri-update-server:latest
    ports:
      - "3000:8080"
    environment:
      - USERNAME=wovnep
      - REPO=tauri-updater
      - API_KEY=${API_KEY}
      - TAG_STRUCTURE=v
      - DEFAULT_LANG=en-US
      - SIGNATURE=true
```

## Environment variables

|Name					|Required			|Default      |Description|	
| ----------- | ----------- | ----------- |-----------|
|USERNAME			|true					|null         |Github username/owner/organization|
|REPO					|true					|null         |Github repository of the project|
|DEFAULT_LANG |false        |en-US        |Windows build language. [Supported languages](https://tauri.app/v1/api/config#wixconfig.language).|
|TAG_STRUCTURE|true         |v            |Release tag prefix. eg: v in v1.23.4|
|SIGNATURE		|false			  |false        |If you [sign updates](https://tauri.app/v1/guides/distribution/updater#signing-updates), Set this to true.|
|API_KEY			|false				|null         |[Personal access token](https://github.com/settings/tokens).|

## Development

**Build**
```
npm run build
```

**Start**
```
npm start
```

**Dev**
```
npm run dev
```

## License

MIT