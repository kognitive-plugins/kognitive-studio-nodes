const axios = require('axios');

module.exports = function(RED) {
  function TTSNode(config) {
    RED.nodes.createNode(this,config);
      this.apikey = config.apikey;
      var node = this;
      node.on('input', function(msg) {

        let base_url = process.env.KOGNITIVE_ENDPOINT;
        var conf = {
          method: 'get',
          url: base_url + '/api/tts?text=' + msg.payload.input,
          headers: { 
            'x-api-key': node.apikey
          }
        };
        
        axios(conf)
        .then(function (response) {
            msg.payload = response.data;
            node.send(msg);
        })
        .catch(function (error) {
          console.log(error);
          node.send(error);
        });
      });
  }

  RED.nodes.registerType("tts",TTSNode);

}