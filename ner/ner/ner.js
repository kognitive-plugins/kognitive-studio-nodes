const axios = require('axios');

module.exports = function(RED) {
  function NERNode(config) {
    RED.nodes.createNode(this,config);
      this.apikey = config.apikey;
      var node = this;
      node.on('input', function(msg) {

        let base_url = process.env.KOGNITIVE_ENDPOINT;
        var conf = {
          method: 'post',
          url: base_url + '/api/ner',
          headers: { 
            'x-api-key': node.apikey
          },
          data : msg.payload
        };
        
        axios(conf)
        .then(function (response) {
          console.log(JSON.stringify(response.data));
            msg.payload = response.data;
            node.send(msg);
        })
        .catch(function (error) {
          console.log(error);
          console.log(error);
          node.send(error);
        });
      });
  }

  RED.nodes.registerType("ner",NERNode);

}