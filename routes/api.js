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

      if(!num && !unit){
        return res.send("invalid number and unit")
      }
  
      if(!num){
        return res.send("invalid number")
      }
  
      if(!unit){
        return res.send("invalid unit")
      }

      let returnNum = convertHandler.convert(num, unit);
      let returnUnit = convertHandler.getReturnUnit(unit);

      return res.send(convertHandler.getString(num, unit, returnNum, returnUnit))
    }
    return res.redirect("/")
  })
};
