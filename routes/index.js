const APIRouter = require('./api');

class Router {
  static registerRoutes(app) {
    APIRouter.registerRoutes(app);
  }
}

module.exports = Router;
