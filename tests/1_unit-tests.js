const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();
 
suite('Unit Tests', function(){
    suite("number input", () => {
        test("int input", (done) => {
            assert.strictEqual(convertHandler.getNum("5kg"), 5);
            done();
        });

        test("decimal input", (done) => {
            assert.strictEqual(convertHandler.getNum("5.6kg"), 5.6);
            done();
        });

        test("fractional input", (done) => {
            assert.strictEqual(convertHandler.getNum("5/8l"), 0.625);
            done();
        });

        test("fractional decimal input", (done) => {
            assert.strictEqual(convertHandler.getNum("5.8/5.8kg"), 1);
            done();
        });

        test("double fraction input (should fail)", (done) => {
            assert.isNull(convertHandler.getNum("5.8/5.8/3.2kg"));
            done();
        });

        test("default to 1 when no numerical input is given", (done) => {
            assert.strictEqual(convertHandler.getNum("kg"), 1);
            done();
        });
    })

    suite("getUnit tests", () => {
        test("input unit tests", (done) => {
            //should get every unit
            assert.strictEqual(convertHandler.getUnit("1kg"), "kg")
            assert.strictEqual(convertHandler.getUnit("1l"), "L")
            assert.strictEqual(convertHandler.getUnit("1km"), "km")
            assert.strictEqual(convertHandler.getUnit("1mi"), "mi")
            assert.strictEqual(convertHandler.getUnit("1gal"), "gal")
            assert.strictEqual(convertHandler.getUnit("1lbs"), "lbs")
            done();
        })

        test("unknown input", (done) => {
            assert.isNotOk(convertHandler.getUnit("1oz"));            
            done();
        })
    })
    
    suite("returnUnit tests", () => {
        test("returned input units", (done)=> {
            assert.strictEqual(convertHandler.getReturnUnit("gal"), "L")
            assert.strictEqual(convertHandler.getReturnUnit("l"), "gal")
            assert.strictEqual(convertHandler.getReturnUnit("mi"), "km")
            assert.strictEqual(convertHandler.getReturnUnit("km"), "mi")
            assert.strictEqual(convertHandler.getReturnUnit("lbs"), "kg")
            assert.strictEqual(convertHandler.getReturnUnit("kg"), "lbs")
            done();       
        })
    })

    suite("spellOutUnit tests", () => {
        test("spelled input units", (done)=> {
            assert.strictEqual(convertHandler.spellOutUnit("gal"), "gallons")
            assert.strictEqual(convertHandler.spellOutUnit("L"), "liters")
            assert.strictEqual(convertHandler.spellOutUnit("mi"), "miles")
            assert.strictEqual(convertHandler.spellOutUnit("km"), "kilometers")
            assert.strictEqual(convertHandler.spellOutUnit("lbs"), "pounds")
            assert.strictEqual(convertHandler.spellOutUnit("kg"), "kilograms")
            done();       
        })
    })

    suite("convert tests", () => {
        test("gal to l", (done) => {
            assert.strictEqual(convertHandler.convert(1, "gal"), 3.78541)
            done()
        })

        test("l to gal", (done) => {
            assert.strictEqual(convertHandler.convert(1, "l"), 0.26417)
            done()
        })

        test("mi to km", (done) => {
            assert.strictEqual(convertHandler.convert(1, "mi"), 1.60934)
            done()
        })

        test("km to mi", (done) => {
            assert.strictEqual(convertHandler.convert(1, "km"), 0.62137)
            done()
        })

        test("lbs to kg", (done) => {
            assert.strictEqual(convertHandler.convert(1, "lbs"), 0.45359)
            done()
        })

        test("kg to lbs", (done) => {
            assert.strictEqual(convertHandler.convert(1, "kg"), 2.20462)
            done()
        })
    })
});