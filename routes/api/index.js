const express = require('express');

const linkRoute = require('./link.route');

class APIRouter {
  static registerRoutes(app) {
    const router = express.Router();
    router.use('/link', linkRoute);

    app.use('/api', router);
  }
}

module.exports = APIRouter;
