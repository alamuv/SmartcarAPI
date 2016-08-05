const vehiclesRouter = require('express').Router();
const vehiclesController = require('../controllers/vehicles');

vehiclesRouter.route('/:id')
  .get(vehiclesController.getVehiclesInfo);

vehiclesRouter.route('/:id/doors')
  .get(vehiclesController.getDoorsStatus);

vehiclesRouter.route('/:id/fuel')
  .get(vehiclesController.getFuelRange);

vehiclesRouter.route('/:id/battery')
  .get(vehiclesController.getBatteryRange);

vehiclesRouter.route('/:id/engine')
  .post(vehiclesController.postEngine);

module.exports = vehiclesRouter;