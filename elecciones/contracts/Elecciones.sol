pragma solidity ^0.5.0;

contract Elecciones {
	// Moderar candidato
	struct Candidato {
		uint id;
		string nombre;
		uint numeroVotos;
	}

	// Almacenar candidatos

	// Obtener candidatos
	mapping(uint => Candidato) public candidatos;

	// Número candidatos
	uint public candidatosContador; 

	// Alamacenar cuentas de gente que ha votado
    mapping(address => bool) public votantes;

    // Constructor
    constructor() public {
    	aniadirCandidato("Candidato 1");
    	aniadirCandidato("Candidato 2");
    } 

    function aniadirCandidato (string memory _nombre) private {
        candidatosContador ++;
        candidatos[candidatosContador] = Candidato(candidatosContador, _nombre, 0);
    }

    function voto (uint _idCandidato) public {
        // Requiere que no hayan votado previamente
        require(!votantes[msg.sender]);

        // Requiere un candidato válido
        require(_idCandidato > 0 && _idCandidato <= candidatosContador);

        // Alamacena votantes que han votado
        votantes[msg.sender] = true;

        // Actualizar contador
        candidatos[_idCandidato].numeroVotos ++;
    }
}
