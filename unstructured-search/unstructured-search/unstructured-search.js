const axios = require('axios');

module.exports = function(RED) {
  function UnstructuredSearchNode(config) {
    RED.nodes.createNode(this,config);
      this.apikey = config.apikey;
      var node = this;
      node.on('input', function(msg) {

        let base_url = process.env.KOGNITIVE_ENDPOINT;
        var conf = {
          method: 'get',
          url: base_url + '/api/nlp-unstructured-search?q=' + msg.payload.input,
          headers: { 
            'x-api-key': node.apikey
          }
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

  RED.nodes.registerType("unstructured-search",UnstructuredSearchNode);

}