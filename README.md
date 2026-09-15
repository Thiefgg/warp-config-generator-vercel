# WARP Configuration Generator

[Русский](README_ru.md) | **English**

### Original version by llimonix

![Original WARP Generator](.github/assets/screenshot.png)

*Original project interface by llimonix / nellimonix.*

### Current fork — Sakeenkok & Dariysu

#### Desktop

![Current WARP Generator — Desktop](.github/assets/screenshot-current.png)

*Current customized desktop version of the fork maintained by Sakeenkok & Dariysu.*

#### Mobile

![Current WARP Generator — Mobile](.github/assets/screenshot-mobile.png)

*Current customized mobile version of the fork maintained by Sakeenkok & Dariysu.*

Open-source generator for Cloudflare WARP configurations with support for WireGuard, AmneziaWG, Clash, Throne, Nekoray, Husi, Karing and WireSock.

This repository is a customized fork of the original [nellimonix/warp-config-generator-vercel](https://github.com/nellimonix/warp-config-generator-vercel) project. The original project and its author remain credited below.

## 🌐 Sakeenkok version

This fork contains personal UI, branding and configuration changes maintained by **Sakeenkok**.

- **Main site:** https://warp.sakeen.ru
- **Cloudflare mirror:** https://warp-generator.sadafaxdid.workers.dev
- **GitHub:** https://github.com/Thiefgg/warp-config-generator-vercel

## 🚀 Quick Deployment

### Docker (recommended)

Pre-built image is published to GHCR on every push to `master`:

```bash
docker run -d --name warp-generator \
  -p 3000:3000 \
  --restart unless-stopped \
  ghcr.io/nellimonix/warp-config-generator-vercel-public:latest
````

Open [http://localhost:3000](http://localhost:3000).

### Docker — build locally

```bash
docker build -t warp-generator-public .
docker run -d -p 3000:3000 --name warp-generator warp-generator-public
```

### docker-compose

```yaml
services:
  warp-generator:
    image: ghcr.io/nellimonix/warp-config-generator-vercel-public:latest
    container_name: warp-generator
    ports:
      - "3000:3000"
    restart: unless-stopped
```

### Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Thiefgg/warp-config-generator-vercel&repository-name=warp)

* Or via [CLI](https://vercel.com/docs/cli): `vercel deploy`
* Local dev: `vercel dev`

### Netlify

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Thiefgg/warp-config-generator-vercel&siteName=warp)

* Or via [CLI](https://docs.netlify.com/cli/get-started/): `netlify deploy`
* Local dev: `netlify dev`

### Cloudflare Workers

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/Thiefgg/warp-config-generator-vercel)

* Or via [Wrangler](https://developers.cloudflare.com/workers/wrangler/): `wrangler deploy`
* Local dev: `wrangler dev`

### Cloudflare Pages

The same `wrangler.jsonc` deploys to Pages with the static export.

```bash
CLOUDFLARE_WORKERS=1 npm run build
npx wrangler pages deploy out --project-name=warp-generator
```

Or connect the repository in the Cloudflare dashboard:

* Build command: `CLOUDFLARE_WORKERS=1 npm run build`
* Output directory: `out`

## 🛠️ Local Development

```bash
npm install
npm run dev
npm run build
npm run start
npm run lint
```

## ⚙️ Generator Options and API

The generator exposes the same options in the UI and in `POST /api/generate`:

| Option              | Behavior and constraints                                                                                                                                                                   |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Endpoint            | `endpointRandom: true` selects a fresh Cloudflare host and port during generation. For MASQUE it uses the dedicated MASQUE address and port pools.                                         |
| Clash protocol      | `clashProtocol` accepts `awg`, `masque`, or `awg_masque`. The combined mode emits selectable AWG, MASQUE QUIC, and MASQUE H2 proxies.                                                      |
| DNS                 | Providers come from `config/dns.ts`. Community providers are marked with `•`; selecting one forces **All sites** and clears selected services because they do not support split tunneling. |
| IPv6                | Enabled by default. Disabling it removes IPv6 from the interface address, DNS list, and the default all-sites `AllowedIPs`.                                                                |
| Exclude LAN         | Available only in **All sites** mode. It replaces the default routes with public address ranges so private/reserved LAN ranges stay outside the tunnel.                                    |
| PersistentKeepalive | Disabled by default. Enabling it with an empty UI field uses `25`; the API accepts integers from `1` through `65535`.                                                                      |
| Custom I1           | Allows a custom domain to be used for the AmneziaWG QUIC `I1` mask and WireSock `Id`. Invalid or empty values fall back to the bundled defaults.                                           |

Example request against a local deployment:

```bash
curl -X POST http://localhost:3000/api/generate \
  -H "Content-Type: application/json" \
  -d '{
    "selectedServices": [],
    "siteMode": "all",
    "deviceType": "awg15",
    "endpoint": "engage.cloudflareclient.com:4500",
    "configFormat": "wireguard",
    "dnsId": "cf",
    "ipv6": false,
    "excludeLan": true,
    "persistentKeepalive": 25,
    "customI1Domain": "google.com"
  }'
```

A successful response has `success: true` and a `content` object containing `configBase64`, `qrCodeBase64`, `configFormat`, and `fileName`.

## ➕ Adding a new service

The "specific sites" mode lets users select services to route through WARP.

To add one:

1. **Fork** the repository and create a branch.
2. **Create** `config/services/<your-service-key>.json`:

```json
{
  "name": "Display Name",
  "icon": "FaIconName",
  "iconLibrary": "fa",
  "type": "new",
  "ips": "1.2.3.0/24, 5.6.7.0/24, ..."
}
```

* `name` — user-visible service name.
* `icon` — icon name from [react-icons](https://react-icons.github.io/react-icons/).
* `iconLibrary` — react-icons library.
* `type` — optional. Set `"new"` to show a `NEW` badge.
* `ips` — comma-separated CIDR ranges.

3. **Do NOT edit** `worker/api-handler.js` or `functions/api/generate.js`. The GitHub Action rebuilds the `IP_RANGES` blocks automatically.
4. **Open a Pull Request** to `master`.

### Local preview

```bash
node scripts/build-ip-ranges.mjs
```

This rebuilds the generated IP range blocks in the worker and Netlify handlers.

### Adding a DNS provider

1. Add the provider to `DNS_PROVIDERS` in `config/dns.ts`.
2. Set `isCommunity: true` if the provider cannot be used with specific-site routing.
3. Mirror the provider in the embedded DNS lists used by the worker and Netlify handlers.
4. Run:

```bash
npm run build
```

before opening a Pull Request.

### Maintaining default I1 masks

`lib/builders/shared.ts` is the source of truth for default I1 masks.

1. Edit the `I1_MASKS` array.
2. Run:

```bash
node scripts/build-i1-masks.mjs
```

3. Commit the generated changes.

## 📁 Project Structure

```text
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── not-found.tsx
│   └── api/generate/route.ts
│
├── components/
│   ├── home-client.tsx
│   ├── layout/
│   │   ├── topbar.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   ├── generator/
│   │   ├── config-selectors.tsx
│   │   ├── advanced-settings.tsx
│   │   ├── service-picker.tsx
│   │   ├── result-panel.tsx
│   │   ├── formats-tab.tsx
│   │   └── about-tab.tsx
│   └── icons/
│
├── config/
│   ├── services/
│   ├── services-loader.ts
│   ├── dns.ts
│   ├── endpoints.ts
│   └── formats.ts
│
├── lib/
│   ├── builders/
│   ├── warp-service.ts
│   ├── quic.ts
│   ├── cloudflare-client.ts
│   ├── crypto.ts
│   ├── qr-generator.ts
│   └── ip-ranges.ts
│
├── hooks/
│   ├── use-generator.ts
│   └── use-mobile.ts
│
├── scripts/
│   ├── build-ip-ranges.mjs
│   └── build-i1-masks.mjs
│
├── worker/
├── functions/
├── types/
├── styles/
├── .github/
├── Dockerfile
├── next.config.mjs
└── package.json
```

## 🔧 Configuration

No environment variables are required for the public build.

The generator runs anonymously against the public Cloudflare WARP registration API.

### Build modes

`next.config.mjs` switches the output depending on the environment:

| Environment                       | Output       | Used by          |
| --------------------------------- | ------------ | ---------------- |
| `DOCKER_BUILD=1`                  | `standalone` | Docker           |
| `CLOUDFLARE_WORKERS` / `CF_PAGES` | `export`     | Cloudflare       |
| none                              | default      | Vercel / Netlify |

## 🌐 Supported Platforms

| Platform           | Support |
| ------------------ | ------- |
| Docker             | ✅       |
| Vercel             | ✅       |
| Netlify            | ✅       |
| Cloudflare Workers | ✅       |
| Cloudflare Pages   | ✅       |

## 🔗 Links

### Sakeenkok

* **Main Site:** [https://warp.sakeen.ru](https://warp.sakeen.ru)
* **Cloudflare Mirror:** [https://warp-generator.sadafaxdid.workers.dev](https://warp-generator.sadafaxdid.workers.dev)
* **GitHub:** [https://github.com/Thiefgg/warp-config-generator-vercel](https://github.com/Thiefgg/warp-config-generator-vercel)
* **Telegram Dariysu:** [https://t.me/dar1ysu](https://t.me/dar1ysu)

### Original project

* **Main Site:** [https://warp3.llimonix.pw](https://warp3.llimonix.pw)
* **Vercel Mirror:** [https://warply3.vercel.app](https://warply3.vercel.app)
* **Netlify Mirror:** [https://getwarp3.netlify.app](https://getwarp3.netlify.app)
* **Cloudflare Mirror:** [https://warp.llimonix.workers.dev](https://warp.llimonix.workers.dev)
* **GitHub:** [https://github.com/nellimonix/warp-config-generator-vercel](https://github.com/nellimonix/warp-config-generator-vercel)

## 📄 License

MIT License — see [LICENCE](LICENCE).

This fork retains the original project's license and attribution.

## 🤝 Contributing

Contributions and improvements are welcome.

1. Fork the repository.
2. Create a feature branch.
3. Make your changes.
4. Test the project locally.
5. Open a Pull Request.

## ⭐ Star History

[![Star History Chart](https://api.star-history.com/chart?repos=Thiefgg/warp-config-generator-vercel\&type=date\&legend=bottom-right)](https://www.star-history.com/?repos=Thiefgg%2Fwarp-config-generator-vercel&type=date&legend=bottom-right)

---

### Original project

This project is based on the open-source work of **llimonix / nellimonix**.

Original repository: [https://github.com/nellimonix/warp-config-generator-vercel](https://github.com/nellimonix/warp-config-generator-vercel)

### Sakeenkok

Customized and maintained by **Sakeenkok**.

GitHub: [https://github.com/Thiefgg/warp-config-generator-vercel](https://github.com/Thiefgg/warp-config-generator-vercel)

```

