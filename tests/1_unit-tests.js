const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
 
suite('Unit Tests', function(){
    suite("number input", () => {
        test("int input", () => {
            assert.strictEqual(convertHandler.getNum("5kg"), 5);
        });

        test("decimal input", () => {
            assert.strictEqual(convertHandler.getNum("5.6kg"), 5.6);
        });

        test("fractional input", () => {
            assert.strictEqual(convertHandler.getNum("5/8l"), 0.625);
        });

        test("fractional decimal input", () => {
            assert.strictEqual(convertHandler.getNum("5.8/5.8kg"), 1);
        });

        test("double fraction input (should fail)", () => {
            assert.isNull(convertHandler.getNum("5.8/5.8/3.2kg"));
        });

        test("default to 1 when no numerical input is given", () => {
            assert.strictEqual(convertHandler.getNum("kg"), 1);
        });
    })

    suite("getUnit tests", () => {
        test("input unit tests", () => {
            //should get every unit
            assert.strictEqual(convertHandler.getUnit("1kg"), "kg")
            assert.strictEqual(convertHandler.getUnit("1l"), "L")
            assert.strictEqual(convertHandler.getUnit("1km"), "km")
            assert.strictEqual(convertHandler.getUnit("1mi"), "mi")
            assert.strictEqual(convertHandler.getUnit("1gal"), "gal")
            assert.strictEqual(convertHandler.getUnit("1lbs"), "lbs")
        })

        test("unknown input", () => {
            assert.isNotOk(convertHandler.getUnit("1oz"));            
        })
    })
    
    suite("returnUnit tests", () => {
        test("returned input units", ()=> {
            assert.strictEqual(convertHandler.getReturnUnit("gal"), "L")
            assert.strictEqual(convertHandler.getReturnUnit("l"), "gal")
            assert.strictEqual(convertHandler.getReturnUnit("mi"), "km")
            assert.strictEqual(convertHandler.getReturnUnit("km"), "mi")
            assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg")
            assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs")
        })
    })

    suite("spellOutUnit tests", () => {
        test("spelled input units", ()=> {
            assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons")
            assert.strictEqual(convertHandler.spellOutUnit("L"), "liters")
            assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles")
            assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers")
            assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds")
            assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms")
        })
    })

    suite("convert tests", () => {
        test("gal to l", () => {
            assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541)
        })

        test("l to gal", () => {
            assert.strictEqual(convertHandler.convert(1, "l"), 0.26417)
        })

        test("mi to km", () => {
            assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934)
        })

        test("km to mi", () => {
            assert.strictEqual(convertHandler.convert(1, "km"), 0.62137)
        })

        test("lbs to kg", () => {
            assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359)
        })

        test("kg to lbs", () => {
            assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462)
        })
    })
});