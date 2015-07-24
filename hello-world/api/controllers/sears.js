'use strict';

var util = require('util');
var request = require('request');

module.exports = {
  getinfo: getinfo
};

function getinfo(req, res) {
  // variables defined in the Swagger document can be referenced using req.swagger.params.{parameter_name}
  var devKey = 'TdpqAvfnhmzsJPuPGjtgTEBU8VXOZOVL';
  var devSecert = 'yCRHV1FVuxSSlo6o';
  var type = req.swagger.params.type.value;
  var prodnum = req.swagger.params.prodnum.value || '04649599000';
  var zipcode = req.swagger.params.zipcode.value;
  var url = '';

  // var hello = util.format('Hello, %s!', name);
  if (type === 'topsellers'){
    var id = req.swagger.params.cat.value || 'Appliances';
    url = "http://api.developer.sears.com/v2.1/products/browse/topSellers/Sears/json/searchType/unit?category=" + id  + "&apikey=" + devKey;
  } else if (type === 'search') {
    var key = req.swagger.params.keyword.value;
    url = "http://api.developer.sears.com/v2.1/products/search/Sears/json/keyword/" + keyword + "?apikey=" + devKey;
  } else if (type === 'details') {
    url = "http://api.developer.sears.com/v3/productDetail/getProduct/Sears%20/json/" + prodnum + "?apikey=" + devKey;
  } else if (type === 'storeinfo') {
    var by = req.swagger.params.by.value;
      if (by === 'zipcode'){
          url = 'http://api.developer.sears.com/v2.2/stores/storeInfo/Sears/json /zip/' + zipcode + '?apikey=' + devKey;
      } else if (by === 'citystate') {
          var city = req.swagger.params.city.value;
          var state = req.swagger.params.state.value;
          url = 'http://api.developer.sears.com/v2.2/stores/storeInfo/Sears /json/city/' + city + '/state/' + state + '?apikey=' + devKey;
      } else if (by === coord) {
          var lon = req.swagger.params.lon.value;
          var lad = req.swagger.params.lad.value;
          url = 'http://api.developer.sears.com/v2.2/stores/storeInfo/Sears/json /longitude/' + lon + '/latitude/' + lad + '?apikey=' + devKey;
      }
  } else if (type === 'localin') {
      var distance = req.swagger.params.distance.value;
      url = 'http://api.developer.sears.com/v2.1/product/availability/pickup//Sears/json/' + prodnum + '/' + zipcode + '?maxDistance=' + distance + '&apikey=' + devKey;
  }

  request.get(url).pipe(res);

  // // this sends back a JSON response which is a single string
  // res.json(test);
}
