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

[![Deploy to Railway](https://railway.app/button.svg)](https://railway.com/deploy/ccxt)

## Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `PORT` | `8080` | HTTP server port |

## License

MIT
