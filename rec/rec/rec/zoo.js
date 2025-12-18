//OO úteis
//Object.getPrototypeOf(instancia);
//animal instanceof tipo  ->retorna true se for do mesmo tipo
//Object.getPrototypeOf( Object.getPrototypeOf(instancia)).constructor.name;
//instancia.constructor retorna o tipo da classe

//section de adição de animais
selectedClasseAnimal = document.getElementById("classeAnimal")
selectedAnimal = document.getElementById("animal")
idAnimal = document.getElementById("idAnimal")
idadeAnimal = document.getElementById("idadeAnimal") 
btSalvarNovoAnimal = document.getElementById("btSalvarNovoAnimal")

//selectedClasseAnimal.value <-pegar o value do item selecionado 
//selectedAnimal.value

//envie uma Map, a chave será usada no value, e o valor será usado para exibiçção ao usuário
function popularItensSelectedAnimal(selected,  dados) {
    selected.options.length = 0;//limpa os dados anteriores
    for (const [chave, valor] of dados) {//popula os novos dados
        selectedAnimal.add(new Option(chave, valor));
    }
}
//ex de uso: popularItensSelectedAnimal(selectedAnimal,new Map([['anta', 'anta'], ['bezerro','bezerro']]))


//Criação de regras de convivência
classeAnimalTp1 = document.getElementById("classeAnimalTp1")
animalTp1  = document.getElementById("animalTp1")
classeAnimalTp2 = document.getElementById("classeAnimalTp2")
animalTp2  = document.getElementById("animalTp2")
btSalvarNovaRegraConv = document.getElementById("btSalvarNovaRegraConv")

//Jaulas
//criação de jaula
identificadorJaula = document.getElementById("identificadorJaula")//pode ser manual
nomeJaula = document.getElementById("nomeJaula")
btSalvarNovajaula = document.getElementById("btSalvarNovajaula")

//Salvar tipos para a jaula
idJaulaSetTipos = document.getElementById("idJaulaSetTipos")
ClasseAnimalPermitidoJaula = document.getElementById("ClasseAnimalPermitidoJaula")
AnimalPermitidoJaula = document.getElementById("AnimalPermitidoJaula")
btSalvarNovoTipoParaJaula = document.getElementById("btSalvarNovoTipoParaJaula")

//enjaular animal
enjaularIdAnimal = document.getElementById("enjaularIdAnimal")
enjaularIdJaula = document.getElementById("enjaularIdJaula")
btEnjaular = document.getElementById("btEnjaular")

//visualização de jaulas
//a jaula deve conter os animais dentro dela em uma coleção chamada animais exemplo: jaula1.animais
    //_jaula.nome 
    //_jaula.identificador
    //_jaula.animais

function mostrarJaulas(_jaula) {
    const aside = document.getElementById("area-jaulas");
    const template = aside.querySelector(".jaula-card.template");
    const card = template.cloneNode(true);
    card.style.display = "block";
    card.classList.remove("template");

    // === preenchimento LOCAL ===
    card.querySelector(".nome-jaula").innerText = _jaula.nome;
    card.querySelector(".id-jaula").innerText = "ID: " + _jaula.identificador;

    // tipos permitidos
    const listaTipos = card.querySelector(".tipos-permitidos");
    listaTipos.innerHTML = "";
    for (let i = 0; i < _jaula.tiposPermitidos.length; i++) {
        let li = document.createElement("li");
        li.innerText = _jaula.tiposPermitidos[i];
        listaTipos.appendChild(li);
    }

    // animais
    const listaAnimais = card.querySelector(".lista-animais");
    listaAnimais.innerHTML = "";
    for (let i = 0; i < _jaula.animais.length; i++) {
        let li = document.createElement("li");
        li.innerText =
            _jaula.animais[i].id + " (" +
            _jaula.animais[i].constructor.name + ")";
        listaAnimais.appendChild(li);
    }

    // adiciona no aside
    aside.appendChild(card);
}


let jaula1 = {
    nome: "Jaula dos Felinos",
    identificador: 1,
    tiposPermitidos: ["Leão", "Tigre", "Onça"],
    animais: [
        { nome: "Simba", especie: "Leão" },
        { nome: "Rajah", especie: "Tigre" }
    ]
};

let jaula2 = {
    nome: "Jaula das Aves",
    id: 2,
    tiposPermitidos: ["Arara", "Papagaio"],
    animais: [
         new pato("donald") 
    ]
};


mostrarJaulas(jaula1);
mostrarJaulas(jaula2);