App = {
  web3Provider: null,
  contracts: {},
  account: '0x0',

  init: function() {
    return App.initWeb3();
  },

  initWeb3: function() {
    if (typeof web3 !== 'undefined') {
      // If a web3 instance is already provided by Meta Mask.
      App.web3Provider = web3.currentProvider;
      web3 = new Web3(web3.currentProvider);
    } else {
      // Specify default instance if no web3 instance provided
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
      web3 = new Web3(App.web3Provider);
    }
    return App.initContract();
  },

  initContract: function() {
    $.getJSON("Elecciones.json", function(election) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Elecciones = TruffleContract(election);
      // Connect provider to interact with contract
      App.contracts.Elecciones.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
    var electionInstance;
    var loader = $("#loader");
    var content = $("#content");

    loader.show();
    content.hide();

    // Load account data
    web3.eth.getCoinbase(function(err, account) {
      if (err === null) {
        App.account = account;
        $("#accountAddress").html("Your Account: " + account);
      }
    });

    // Load contract data
    App.contracts.Elecciones.deployed().then(function(instance) {
      electionInstance = instance;
      return electionInstance.candidatosContador();
    }).then(function(candidatosContador) {
      var candidatosResults = $("#candidatosResults");
      candidatosResults.empty();

      for (var i = 1; i <= candidatosContador; i++) {
        electionInstance.candidatos(i).then(function(candidato) {
          var id = candidato[0];
          var name = candidato[1];
          var voteCount = candidato[2];

          // Render candidato Result
          var candidatoTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
          candidatosResults.append(candidatoTemplate);
        });
      }

      loader.hide();
      content.show();
    }).catch(function(error) {
      console.warn(error);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});