import express, { Request, Response, NextFunction, Application } from 'express';
const {
  parse_data,
  check_if_asset_is_in_watchlist,
} = require('../helper/helpers');
const fetch = require('node-fetch');
const {
  add_new_user,
  watchlist_handler_db,
  get_user_watch_list_db,
} = require('../db/db_operations');

const options = {
  method: 'GET',
  headers: { Accept: 'application/json' },
};

const get_cryptocurrencies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  add_new_user(user);
  const url = `https://api.coingecko.com/api/v3/coins?per_page=15`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const to_send_data = await check_if_asset_is_in_watchlist(data, req.user);
    res.status(200).send(to_send_data);
  } catch (err) {
    console.error(err);
  }
};

const get_crypto = async (req: Request, res: Response, next: NextFunction) => {
  const url = `https://api.coingecko.com/api/v3/coins/${req.params.id}`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
};

const get_crypto_market_history = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const url = `https://api.coingecko.com/api/v3/coins/${req.params.id}/market_chart?vs_currency=usd&days=max&interval=daily`;
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    const data_to_send = parse_data(data.prices);
    res.status(200).send(data_to_send);
  } catch (err) {
    console.error(err);
  }
};

const watchlist_handler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // add user to db
  let user = req.user;
  const to_add_watchlist_asset = req.body.value;
  watchlist_handler_db(user, to_add_watchlist_asset);
};

const get_user_watchlist = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user;
  let watchlist_array = await get_user_watch_list_db(user.uid);
  watchlist_array = watchlist_array.reverse();
  const build_url = watchlist_array.map((asset: string) => {
    return `https://api.coingecko.com/api/v3/coins/${asset}`;
  });
  try {
    const req = await Promise.all(
      build_url.map((url: string) => {
        return fetch(url, options);
      })
    );
    const data = await Promise.all(req.map((r: any) => r.json()));
    res.status(200).send(data);
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  get_cryptocurrencies,
  get_crypto,
  get_crypto_market_history,
  watchlist_handler,
  get_user_watchlist,
};
