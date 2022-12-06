'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  let resObj = { 
    initNum: 0, 
    initUnit: '', 
    returnNum: 0, 
    returnUnit: '', 
    string: '' 
  };

  app.get("/api/convert", (req, res) => {
    if(req.query.input){
      let input = req.query.input; 

      let num = convertHandler.getNum(input); 
      
      let unit = convertHandler.getUnit(input);

      let returnNum = convertHandler.convert(num, unit);
      let returnUnit = convertHandler.getReturnUnit(unit);

      let message = convertHandler.getString(num, unit, returnNum, returnUnit);

      return res.send(message)
    }
    return res.redirect("/")
  })
};
