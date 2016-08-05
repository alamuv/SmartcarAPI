const request = require('superagent');
const gmApiUrl = require('../config/gmApiConfig');

var obj = {
  responseType: 'JSON'
};

const getVehiclesInfo = (req, res) => {
  obj.id = req.params.id;

  request
    .post(gmApiUrl + '/getVehicleInfoService')
    .type('application/json')
    .send(obj)
    .end((error, response) => {
      if (error) {
        res.send(error);
      }

      if (response.body.status === "404") {
        res.status(404).json({
          status: response.body.reason ? response.body.reason : null
        });
      } else {
        var responseData = response.body.data;

        var data = {
          vin: responseData.vin.value,
          color: responseData.color.value,
          doorCount: (responseData.fourDoorSedan.value === 'True') ? 4 
                   : (responseData.twoDoorCoupe.value === 'True') ? 2 : null,
          driveTrain: responseData.driveTrain.value,
        }
        res.status(200).json(data);
      }

    });

};

const getDoorsStatus = (req, res) => {
  obj.id = req.params.id;

  request
    .post(gmApiUrl + '/getSecurityStatusService')
    .type('application/json')
    .send(obj)
    .end((error, response) => {
      if (error) {
        res.send(error);
      }

      if (response.body.status === "404") {
        res.status(404).json({
          status: response.body.reason ? response.body.reason : null
        });
      } else {
        var responseData = response.body.data.doors;
        var data = [];

        responseData.values.forEach((door) => {
          var dataObj = {};
          dataObj.location = door.location.value;
          dataObj.locked = (door.locked.value === 'True');
          data.push(dataObj);
        })
        res.status(200).json(data);
      }
    })
};

const getFuelRange = (req, res) => {
  obj.id = req.params.id;

  request
    .post(gmApiUrl + 'getEnergyService')
    .type('application/json')
    .send(obj)
    .end((error, response) => {
      if (error) {
        res.send(error);
      }

      if (response.body.status === "404") {
        res.status(404).json({
          status: response.body.reason ? response.body.reason : null
        });
      } else {
        var responseData = response.body.data;
        var data = {
          percent: (responseData.tankLevel.value === 'null') ? null : responseData.tankLevel.value
        }
        res.status(200).json(data);
      }
    })
};

const getBatteryRange = (req, res) => {
  obj.id = req.params.id;

  request
    .post(gmApiUrl + 'getEnergyService')
    .type('application/json')
    .send(obj)
    .end((error, response) => {
      if (error) {
        res.send(error);
      }

      if (response.body.status === "404") {
        res.status(404).json({
          status: response.body.reason ? response.body.reason : null
        });
      } else {
        var responseData = response.body.data;
        var data = {
          percent: (responseData.batteryLevel.value === 'null') ? null : responseData.batteryLevel.value
        }
        res.status(200).json(data);
      }
    })
};

const postEngine = (req, res) => {
  obj.id = req.params.id;
  obj.command = req.body.action+'_VEHICLE';

  request
    .post(gmApiUrl + 'actionEngineService')
    .type('application/json')
    .send(obj)
    .end((error, response) => {
      if (error) {
        res.send(error);
      }

      if (response.body.status === "404") {
        res.status(404).json({
          status: response.body.reason ? response.body.reason : null
        });
      } else {
        var responseData = response.body.actionResult;
        var data = {
          status: (responseData.status === 'EXECUTED') ? 'success' 
                : (responseData.status === 'FAILED') ? 'error'
                : null
        }
        res.status(200).json(data);
      }
    })
};

module.exports = {
  getVehiclesInfo,
  getDoorsStatus,
  getFuelRange,
  getBatteryRange,
  postEngine
};