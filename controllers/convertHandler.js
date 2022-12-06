const { parseArgs } = require("util");
const math = require("mathjs")

function ConvertHandler() {
  
  this.getNum = (input) => {
    let result = input.replace(/[a-zA-Z]/g, '');
    
    if(result == ""){
      return 1;
    }

    if(/^\d+(\.\d+)?\/?\d+(\.\d+)?$/.test(result)){
      result = math.evaluate(result)
    }

    if(/^\d+$/.test(result) || /^\d+\.?\d+$/.test(result)){
      return parseFloat(result);
    }

    return null;
  };
  
  this.getUnit = (input) => {
    let result = input.replace(/[^a-zA-Z]/g, '')

    if(/^(gal|lbs|kg|mi|km)$/gi.test(result)){
      return result.toLowerCase();
    }
    
    if(/^l$/gi.test(result)){
      return result.toUpperCase();
    }

    return null;
  };
  
  this.getReturnUnit = (initUnit) => {
    initUnit = initUnit.toLowerCase()
    let result;

    switch(initUnit){
      case "gal":
        result = "L";
        break;
      case "lbs": 
        result = "kg";
        break;
      case "mi":
        result = "km";
        break;
      case "l":
        result = "gal";
        break;
      case "kg": 
        result = "lbs";
        break;
      case "km":
        result = "mi";
        break;
    }

    return result;
  };

  this.spellOutUnit = (unit) => {
    let result;
    switch(unit){
      case "gal":
        result = "gallons";
        break;
      case "lbs": 
        result = "pounds";
        break;
      case "mi":
        result = "miles";
        break;
      case ("L" || "l"):
        result = "liters";
        break;
      case "kg": 
        result = "kilograms";
        break;
      case "km":
        result = "kilometers";
        break;
    }

    return result;
  };
  
  this.convert = (initNum, initUnit) => {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch(initUnit.toLowerCase()){
      case "gal":
        return parseFloat(Number(initNum*galToL).toFixed(5));
      case "lbs": 
        return parseFloat(Number(initNum*lbsToKg).toFixed(5));
      case "mi":
        return parseFloat(Number(initNum*miToKm).toFixed(5));
      case "l":
        return parseFloat(Number(initNum/galToL).toFixed(5));
      case "kg": 
        return parseFloat(Number(initNum/lbsToKg).toFixed(5));
      case "km":
        return parseFloat(Number(initNum/miToKm).toFixed(5));
    }

    return "unknown";
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    let result = { 
      initNum: initNum, 
      initUnit: initUnit, 
      returnNum: parseFloat(returnNum), 
      returnUnit: returnUnit, 
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}` 
    };

    if(!result.initNum && !result.returnUnit){
      return "invalid number and unit"
    }

    if(!result.initNum){
      return "invalid number"
    }

    if(!result.returnUnit){
      return "invalid unit"
    }

    return result;
  };
  
}

module.exports = ConvertHandler;
