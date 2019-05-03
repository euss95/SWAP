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
    $.getJSON("Elecciones.json", function(elecciones) {
      // Instantiate a new truffle contract from the artifact
      App.contracts.Elecciones = TruffleContract(elecciones);
      // Connect provider to interact with contract
      App.contracts.Elecciones.setProvider(App.web3Provider);

      return App.render();
    });
  },

  render: function() {
  var eleccionesInstance;
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
    eleccionesInstance = instance;
    return eleccionesInstance.candidatosCount();
  }).then(function(candidatosCount) {
    var candidatosResults = $("#candidatosResults");
    candidatosResults.empty();

    var candidatosSelect = $('#candidatosSelect');
    candidatosSelect.empty();

    for (var i = 1; i <= candidatosCount; i++) {
      eleccionesInstance.candidatos(i).then(function(candidato) {
        var id = candidato[0];
        var name = candidato[1];
        var voteCount = candidato[2];

        // Render candidato Result
        var candidatoTemplate = "<tr><th>" + id + "</th><td>" + name + "</td><td>" + voteCount + "</td></tr>"
        candidatosResults.append(candidatoTemplate);

        // Render candidato ballot option
        var candidatoOption = "<option value='" + id + "' >" + name + "</ option>"
        candidatosSelect.append(candidatoOption);
      });
    }
    return eleccionesInstance.voters(App.account);
  }).then(function(hasVoted) {
    // Do not allow a user to vote
    if(hasVoted) {
      $('form').hide();
    }
    loader.hide();
    content.show();
  }).catch(function(error) {
    console.warn(error);
  });
  
  }

  castVote: function() {
    var candidatosId = $('#candidatossSelect').val();
    App.contracts.Elecciones.deployed().then(function(instance) {
      return instance.vote(candidatosId, { from: App.account });
    }).then(function(result) {
      // Wait for votes to update
      $("#content").hide();
      $("#loader").show();
    }).catch(function(err) {
      console.error(err);
    });
  }
};

$(function() {
  $(window).load(function() {
    App.init();
  });
});