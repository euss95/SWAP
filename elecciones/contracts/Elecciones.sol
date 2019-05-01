pragma solidity ^0.5.0;

contract Elecciones {
	// Moderar candidato
	struct Candidato {
		uint id;
		string nombre;
		uint voteCount;
	}

	// Almacenar candidatos

	// Obtener candidatos
	mapping(uint => Candidato) public candidatos;

	// Número candidatos
	uint public candidatosContador; 

    // Constructor
    constructor() public {
    	aniadirCandidato("Candidato 1");
    	aniadirCandidato("Candidato 2");
    } 

    function aniadirCandidato (string memory _nombre) private {
        candidatosContador ++;
        candidatos[candidatosContador] = Candidato(candidatosContador, _nombre, 0);
    }
}
