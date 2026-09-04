const express = require('express');
const ccxt = require('ccxt');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// List all available exchanges
app.get('/exchanges', (req, res) => {
  res.json(ccxt.exchanges);
});

// Get exchange info
app.get('/exchange/:id', async (req, res) => {
  try {
    const exchangeId = req.params.id;
    if (!ccxt.exchanges.includes(exchangeId)) {
      return res.status(404).json({ error: `Exchange '${exchangeId}' not found` });
    }
    const exchange = new ccxt[exchangeId]();
    await exchange.loadMarkets();
    res.json({
      id: exchange.id,
      name: exchange.name,
      countries: exchange.countries,
      urls: exchange.urls,
      has: exchange.has,
      markets: exchange.markets,
      symbols: exchange.symbols,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get ticker for a symbol on an exchange
app.get('/ticker/:exchangeId/*', async (req, res) => {
  try {
    const exchangeId = req.params.exchangeId;
    const symbol = req.params[0];
    if (!ccxt.exchanges.includes(exchangeId)) {
      return res.status(404).json({ error: `Exchange '${exchangeId}' not found` });
    }
    const exchange = new ccxt[exchangeId]();
    const ticker = await exchange.fetchTicker(symbol.toUpperCase());
    res.json(ticker);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get order book for a symbol on an exchange
app.get('/orderbook/:exchangeId/*', async (req, res) => {
  try {
    const exchangeId = req.params.exchangeId;
    const symbol = req.params[0];
    if (!ccxt.exchanges.includes(exchangeId)) {
      return res.status(404).json({ error: `Exchange '${exchangeId}' not found` });
    }
    const exchange = new ccxt[exchangeId]();
    const orderbook = await exchange.fetchOrderBook(symbol.toUpperCase());
    res.json(orderbook);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get OHLCV for a symbol on an exchange
app.get('/ohlcv/:exchangeId/*', async (req, res) => {
  try {
    const exchangeId = req.params.exchangeId;
    const { timeframe = '1d', limit = 100 } = req.query;
    const symbol = req.params[0];
    if (!ccxt.exchanges.includes(exchangeId)) {
      return res.status(404).json({ error: `Exchange '${exchangeId}' not found` });
    }
    const exchange = new ccxt[exchangeId]();
    const ohlcv = await exchange.fetchOHLCV(symbol.toUpperCase(), timeframe, undefined, parseInt(limit));
    res.json(ohlcv);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get trades for a symbol on an exchange
app.get('/trades/:exchangeId/*', async (req, res) => {
  try {
    const exchangeId = req.params.exchangeId;
    const { limit = 100 } = req.query;
    const symbol = req.params[0];
    if (!ccxt.exchanges.includes(exchangeId)) {
      return res.status(404).json({ error: `Exchange '${exchangeId}' not found` });
    }
    const exchange = new ccxt[exchangeId]();
    const trades = await exchange.fetchTrades(symbol.toUpperCase(), undefined, parseInt(limit));
    res.json(trades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    name: 'CCXT REST API',
    version: '1.0.0',
    endpoints: {
      'GET /health': 'Health check',
      'GET /exchanges': 'List all exchanges',
      'GET /exchange/:id': 'Get exchange info and markets',
      'GET /ticker/:exchangeId/:symbol': 'Get ticker for a symbol',
      'GET /orderbook/:exchangeId/:symbol': 'Get order book',
      'GET /ohlcv/:exchangeId/:symbol': 'Get OHLCV candles',
      'GET /trades/:exchangeId/:symbol': 'Get recent trades',
    },
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`CCXT REST API server running on port ${PORT}`);
});
