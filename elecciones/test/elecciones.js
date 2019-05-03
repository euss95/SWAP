var Elecciones = artifacts.require("./Elecciones.sol");

contract("Elecciones", function(accounts) {
  var EleccionesInstance;

  it("initializes with two candidatos", function() {
    return Elecciones.deployed().then(function(instance) {
      return instance.candidatosContador();
    }).then(function(count) {
      assert.equal(count, 2);
    });
  });
  it("it initializes the candidatos with the correct values", function() {
    return Elecciones.deployed().then(function(instance) {
      EleccionesInstance = instance;
      return EleccionesInstance.candidatos(1);
    }).then(function(candidato) {
      assert.equal(candidato[0], 1, "contains the correct id");
      assert.equal(candidato[1], "Candidato 1", "contains the correct name");
      assert.equal(candidato[2], 0, "contains the correct votes count");
      return EleccionesInstance.candidatos(2);
    }).then(function(candidato) {
      assert.equal(candidato[0], 2, "contains the correct id");
      assert.equal(candidato[1], "Candidato 2", "contains the correct name");
      assert.equal(candidato[2], 0, "contains the correct votes count");
    });
  });
  it("allows a voter to cast a vote", function() {
    return Elecciones.deployed().then(function(instance) {
      eleccionesInstance = instance;
      candidatoId = 1;
      return eleccionesInstance.voto(candidatoId, { from: accounts[0] });
    }).then(function(receipt) {
      return eleccionesInstance.votantes(accounts[0]);
    }).then(function(voted) {
      assert(voted, "the voter was marked as voted");
      return eleccionesInstance.candidatos(candidatoId);
    }).then(function(candidato) {
      var voteCount = candidato[2];
      assert.equal(voteCount, 1, "increments the candidato's vote count");
    })
  });
  it("throws an exception for invalid candidatos", function() {
    return Elecciones.deployed().then(function(instance) {
      eleccionesInstance = instance;
      return eleccionesInstance.vote(99, { from: accounts[1] })
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return eleccionesInstance.candidatos(1);
    }).then(function(candidato1) {
      var voteCount = candidato1[2];
      assert.equal(voteCount, 1, "candidato 1 did not receive any votes");
      return eleccionesInstance.candidatos(2);
    }).then(function(candidato2) {
      var voteCount = candidato2[2];
      assert.equal(voteCount, 0, "candidato 2 did not receive any votes");
    });
  });
  it("throws an exception for double voting", function() {
    return Elecciones.deployed().then(function(instance) {
      eleccionesInstance = instance;
      candidatoId = 2;
      eleccionesInstance.vote(candidatoId, { from: accounts[1] });
      return eleccionesInstance.candidatos(candidatoId);
    }).then(function(candidato) {
      var voteCount = candidato[2];
      assert.equal(voteCount, 1, "accepts first vote");
      // Try to vote again
      return eleccionesInstance.vote(candidatoId, { from: accounts[1] });
    }).then(assert.fail).catch(function(error) {
      assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
      return eleccionesInstance.candidatos(1);
    }).then(function(candidato1) {
      var voteCount = candidato1[2];
      assert.equal(voteCount, 1, "candidato 1 did not receive any votes");
      return eleccionesInstance.candidatos(2);
    }).then(function(candidato2) {
      var voteCount = candidato2[2];
      assert.equal(voteCount, 1, "candidato 2 did not receive any votes");
    });
  });
});