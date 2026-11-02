// Pins this app to a fixed port and to loopback-only binding, on purpose.
//
// On 2026-09-28, this app and an unrelated one on the same server both ran
// `next start` with no explicit port, so both defaulted to 3000. Whichever
// one grabbed the socket last silently absorbed the other's traffic through
// Nginx, with no error anywhere - dronevideography.lk served the other
// site's homepage for hours before anyone noticed.
//
// This file is the fix: the port and host are committed here, in the repo,
// not left to whatever `next start` defaults to or to state that only lives
// in a server's PM2 process table. `pm2 startOrRestart ecosystem.config.js`
// (used by .github/workflows/deploy.yml) re-applies this pinned config on
// every deploy, so even a from-scratch server recovers the same isolation
// automatically. Do not remove the explicit port/host here without also
// updating the Nginx proxy_pass in the server's site config to match.
//
// Port 4101 (not the framework-default 3000, and not 3001 either) is
// reserved for this app in the server's port registry at /opt/ops/PORTS.md.
// That file is the source of truth for which ports are taken on that box -
// check it before ever changing the number below.
//
// Host is "localhost", resolved IPv4 first, so the socket is still exactly
// 127.0.0.1:4101 (what Nginx proxies to). It must not be "127.0.0.1": Next
// rewrites 127.0.0.1 to "localhost" in the URLs its proxy (src/proxy.ts) sees
// but not in the URL it compares rewrites against, so every proxy rewrite
// was treated as external and answered 500 (the hidden admin address and its
// /admin 404). The IPv4-first flag matters: on this server "localhost"
// resolves to ::1 first, and binding there would cut Nginx off.
module.exports = {
  apps: [
    {
      name: "drone",
      script: "npm",
      args: "start -- -p 4101 -H localhost",
      env: {
        NODE_ENV: "production",
        PORT: "4101",
        HOSTNAME: "localhost",
        NODE_OPTIONS: "--dns-result-order=ipv4first",
      },
    },
  ],
};
