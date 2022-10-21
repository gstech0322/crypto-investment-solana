import express, { Request, Response, NextFunction, Application } from 'express';
const { admin, db } = require('../config/firebase');

class Middleware {
  constructor() {}
  async verifyAccessToken(req: Request, res: Response, next: NextFunction) {
    const accessToken = req.headers['authorization'];
    let token: string = '';

    if (!accessToken) {
      return res.status(401).send('Access token is required');
    } else {
      token = accessToken.split(' ')[1];
    }
    try {
      const decoded = await admin.auth().verifyIdToken(token);
      if (decoded) {
        req.user = decoded;
        return next();
      }
    } catch (error) {
      return res.status(401).send('Invalid access token');
    }
  }
}
const middleware = new Middleware();

module.exports = middleware;
