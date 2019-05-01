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
});