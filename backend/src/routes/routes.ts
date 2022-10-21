const express = require('express');
const router = express.Router();
const {
  get_cryptocurrencies,
  get_crypto,
  get_crypto_market_history,
  watchlist_handler,
  get_user_watchlist,
} = require('../controllers/controller');

router.get('/cryptocurrencies', get_cryptocurrencies);
router.get('/cryptocurrencies/:id', get_crypto);
router.get('/cryptocurrencies/chart/:id', get_crypto_market_history);
router.post('/watchlist', watchlist_handler);
router.get('/watchlist', get_user_watchlist);

module.exports = router;
