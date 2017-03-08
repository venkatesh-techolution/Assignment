var request = require("request");
var app = require("../server/app.js")
var base_url = "http://localhost:3000/"

describe("Automobile Server", function() {
  describe("GET make/all", function() {
    it("returns status code 200", function(done) {
      request.get(base_url+"make/all", function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });

    it("Get  made/search", function(done) {
      request.get(base_url, function(error, response, body) {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
  });
});