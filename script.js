$(".newMerchNameColEntry").each( function (index) {
  var self = this;
  var terms = $(self).text();

  var auth = {
    consumerKey: "WVQULa-Px8JDwxcxADEj6w",
    consumerSecret: "JmOnIbQaRsWEpbSGHvjRkuRmubw",
    accessToken: "fB45JmMYkoSZSGFownqXkXgjhQgxYU-h",
    accessTokenSecret: "yMf_TpQKChrPogtAVgH6XJ6bfCo",
    serviceProvider : {
      signatureMethod : 'HMAC-SHA1'
    }
  };
  var near = 'Santa+Barbara';
  var accessor = {
    consumerSecret: auth.consumerSecret,
    tokenSecret: auth.accessTokenSecret
  };
  parameters = [];
  parameters.push(['term', terms]);
  parameters.push(['location', near]);
  parameters.push(['oauth_consumer_key', auth.consumerKey]);
  parameters.push(['oauth_consumer_secret', auth.consumerSecret]);
  parameters.push(['oauth_token', auth.accessToken]);
  parameters.push(['oauth_signature_method', 'HMAC-SHA1']);
  var message = {
    'action': 'http://api.yelp.com/v2/search',
    'method': 'GET',
    'parameters': parameters
  };
  OAuth.setTimestampAndNonce(message);
  OAuth.SignatureMethod.sign(message, accessor);
  var parameterMap = OAuth.getParameterMap(message.parameters);
  parameterMap.oauth_signature = OAuth.percentEncode(parameterMap.oauth_signature)
  console.log(parameterMap);
  $.ajax({
    'url': message.action,
    'data': parameterMap,
    'cache': true,
    'dataType': 'json',
    'success': function(data, textStats, XMLHttpRequest) {
      var rating = data["businesses"][0]["rating"];
      var url = data["businesses"][0]["url"];
      $('<a>', {
        text: rating,
        title: 'Yelp',
        href: url,
        target: '_blank'
      }).appendTo($(self));
    }
  });

});

