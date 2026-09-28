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
module.exports = {
  apps: [
    {
      name: "drone",
      script: "npm",
      args: "start -- -p 3001 -H 127.0.0.1",
      env: { NODE_ENV: "production", PORT: "3001", HOSTNAME: "127.0.0.1" },
    },
  ],
};
