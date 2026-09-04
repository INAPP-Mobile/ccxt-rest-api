# CCXT REST API — Railway Template

A REST API server wrapping [CCXT](https://github.com/ccxt/ccxt) — the world's most popular cryptocurrency exchange trading library. Exposes 100+ exchanges via a simple HTTP interface.

## Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/health` | Health check |
| GET | `/exchanges` | List all supported exchange IDs |
| GET | `/exchange/:id` | Get exchange info, markets, and symbols |
| GET | `/ticker/:exchangeId/:symbol` | Get ticker for a symbol (e.g., `BTC/USDT`) |
| GET | `/orderbook/:exchangeId/:symbol` | Get order book |
| GET | `/ohlcv/:exchangeId/:symbol` | Get OHLCV candles (query: `timeframe`, `limit`) |
| GET | `/trades/:exchangeId/:symbol` | Get recent trades (query: `limit`) |

## Example

```bash
# List all exchanges
curl https://your-app.up.railway.app/exchanges

# Get Binance BTC/USDT ticker
curl https://your-app.up.railway.app/ticker/binance/BTC/USDT

# Get OHLCV candles
curl "https://your-app.up.railway.app/ohlcv/binance/BTC/USDT?timeframe=1d&limit=30"
```

## Deploy

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/FweCfB)

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | HTTP server port |

## License

MIT

---

# Deploy and Host

Deploy this template on Railway with one click. Railway provides compute, TLS at the edge, and a public URL. The service restarts automatically on failures.

## About Hosting

This template runs as a single container with no external dependencies. It's a stateless REST API that proxies requests to public cryptocurrency exchange APIs in real-time — no database, no persistent storage, no volumes required.

## Why Deploy

- **One-click deploy** — No configuration, no setup, just deploy
- **Zero external dependencies** — Single container, no database needed
- **Automatic HTTPS** — Railway provisions TLS certificates automatically
- **Self-healing** — Automatic restarts on failure
- **Stateless** — No data to manage, no backups to worry about

## Common Use Cases

- Cryptocurrency price tracking dashboard backend
- Trading bot data feed
- Exchange market data aggregation
- Personal crypto portfolio API
- Lightweight deployment on Railway's starter resources

## Dependencies for

### Deployment Dependencies

CCXT REST API requires no external dependencies. It connects directly to public exchange APIs over HTTPS.

- [Railway Account](https://railway.app) — hosting platform
- No external database, cache, or message queue required
