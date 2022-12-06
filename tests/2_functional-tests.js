const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    // this.timeout(5000);
    suite("Valid input", () => {
        test("get /api/convert?input=1L", () => {
            chai.request(server)
            .get("/api/convert?input=1L")
            .end((err, res) => {
                assert.equal(res.text, '{"initNum":1,"initUnit":"L","returnNum":0.26417,"returnUnit":"gal","string":"1 liters converts to 0.26417 gallons"}')
            })
        })
    })

    suite("Invalid unit", () => {
        test("get /api/convert?input=32g", () => {
            chai.request(server)
            .get("/api/convert?input=32g")
            .end((err, res) => {
                assert.equal(res.text, 'invalid unit')
            })
        })
    })

    suite("Invalid number", () => {
        test("get /api/convert?input=3/7.2/4kg", () => {
            chai.request(server)
            .get("/api/convert?input=3/7.2/4kg")
            .end((err, res) => {
                assert.equal(res.text, 'invalid number')
            })
        })
    })

    suite("Invalid number AND unit", () => {
        test("get /api/convert?input=3/1.3/4kilomegagram", () => {
            chai.request(server)
            .get("/api/convert?input=3/1.3/4kilomegagram")
            .end((err, res) => {
                assert.equal(res.text, 'invalid number and unit')
            })
        })
    })

    suite("No number input", () => {
        test("get /api/convert?input=kg", () => {
            chai.request(server)
            .get("/api/convert?input=kg")
            .end((err, res) => {
                assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}')
            })
        })
    })
});
