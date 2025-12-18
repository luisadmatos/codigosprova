// CLASSES DE ANIMAIS
class Animal {
    constructor(id, idade) {
        this.id = id;
        this.idade = idade;
        this.jaula = null;
    }
}

class Mamifero extends Animal {}
class Ave extends Animal {}
class Peixe extends Animal {}

class Leao extends Mamifero {}
class Leoa extends Mamifero {}
class Macaco extends Mamifero {}

class Sardinha extends Peixe {}
class Tucunare extends Peixe {}

class Pardal extends Ave {}
class Aguia extends Ave {}

// CLASSE JAULA
class Jaula {
    constructor(identificador, nome) {
        this.identificador = identificador;
        this.nome = nome;
        this.tiposPermitidos = []; 
        this.animais = [];
    }

    podeAdicionar(animal) {
        // Não permitir animal em duas jaulas
        if (animal.jaula !== null) return false;

        // Se não tiver restrição, não entra
        if (this.tiposPermitidos.length === 0) return false;

        // Verifica se o tipo é permitido
        let permitido = false;
        for (let tipo of this.tiposPermitidos) {
            if (animal instanceof tipo) {
                permitido = true;
                break;
            }
        }
        if (!permitido) return false;

        // Regras de convivência
        for (let a of this.animais) {
            if (!podeConviver(animal.constructor.name, a.constructor.name)) {
                return false;
            }
        }

        return true;
    }

    adicionarAnimal(animal) {
        if (this.podeAdicionar(animal)) {
            this.animais.push(animal);
            animal.jaula = this;
            return true;
        }
        return false;
    }
}

// DADOS DO SISTEMA
const animais = [];
const jaulas = [];
const regrasConvivencia = [];

// MAPA DE CLASSES
const mapaClasses = {
    mamifero: new Map([
        ["Leao", Leao],
        ["Leoa", Leoa],
        ["Macaco", Macaco]
    ]),
    ave: new Map([
        ["Pardal", Pardal],
        ["Aguia", Aguia]
    ]),
    peixes: new Map([
        ["Sardinha", Sardinha],
        ["Tucunare", Tucunare]
    ])
};

// FUNÇÃO PARA POPULAR SELECT
function popularItensSelectedAnimal(select, dados) {
    select.options.length = 0;
    for (const [nome] of dados) {
        select.add(new Option(nome, nome));
    }
}

// REGRAS DE CONVIVÊNCIA
function podeConviver(tipo1, tipo2) {
    if (tipo1 === tipo2) return true;

    return regrasConvivencia.some(
        r =>
            (r[0] === tipo1 && r[1] === tipo2) ||
            (r[0] === tipo2 && r[1] === tipo1)
    );
}

// ELEMENTOS DA TELA

const selectedClasseAnimal = document.getElementById("classeAnimal");
const selectedAnimal = document.getElementById("animal");
const idAnimal = document.getElementById("idAnimal");
const idadeAnimal = document.getElementById("idadeAnimal");
const btSalvarNovoAnimal = document.getElementById("btSalvarNovoAnimal");

const classeAnimalTp1 = document.getElementById("classeAnimalTp1");
const animalTp1 = document.getElementById("animalTp1");
const classeAnimalTp2 = document.getElementById("classeAnimalTp2");
const animalTp2 = document.getElementById("animalTp2");
const btSalvarNovaRegraConv = document.getElementById("btSalvarNovaRegraConv");

const identificadorJaula = document.getElementById("identificadorJaula");
const nomeJaula = document.getElementById("nomeJaula");
const btSalvarNovajaula = document.getElementById("btSalvarNovajaula");

const idJaulaSetTipos = document.getElementById("idJaulaSetTipos");
const ClasseAnimalPermitidoJaula = document.getElementById("ClasseAnimalPermitidoJaula");
const AnimalPermitidoJaula = document.getElementById("AnimalPermitidoJaula");
const btSalvarNovoTipoParaJaula = document.getElementById("btSalvarNovoTipoParaJaula");

const enjaularIdAnimal = document.getElementById("enjaularIdAnimal");
const enjaularIdJaula = document.getElementById("enjaularIdJaula");
const btEnjaular = document.getElementById("btEnjaular");

// EVENTOS DE SELECT
selectedClasseAnimal.onchange = () => {
    popularItensSelectedAnimal(selectedAnimal, mapaClasses[selectedClasseAnimal.value]);
};

classeAnimalTp1.onchange = () => {
    popularItensSelectedAnimal(animalTp1, mapaClasses[classeAnimalTp1.value]);
};

classeAnimalTp2.onchange = () => {
    popularItensSelectedAnimal(animalTp2, mapaClasses[classeAnimalTp2.value]);
};

ClasseAnimalPermitidoJaula.onchange = () => {
    popularItensSelectedAnimal(AnimalPermitidoJaula, mapaClasses[ClasseAnimalPermitidoJaula.value]);
};

// CADASTRAR ANIMAL
btSalvarNovoAnimal.onclick = () => {
    const classe = selectedClasseAnimal.value;
    const tipo = selectedAnimal.value;
    const id = idAnimal.value;
    const idade = idadeAnimal.value;

    const Classe = mapaClasses[classe].get(tipo);
    const animal = new Classe(id, idade);

    animais.push(animal);
    alert("Animal cadastrado!");
};

// CADASTRAR REGRA DE CONVIVÊNCIA
btSalvarNovaRegraConv.onclick = () => {
    regrasConvivencia.push([
        animalTp1.value,
        animalTp2.value
    ]);
    alert("Regra de convivência cadastrada!");
};

// CRIAR JAULA
btSalvarNovajaula.onclick = () => {

    if (jaulas.some(j => j.identificador = identificadorJaula.value)){
        alert("Já existe uma jaula com esse identificador!")
        return;
    }
    const jaula = new Jaula(
        identificadorJaula.value,
        nomeJaula.value
    );
    jaulas.push(jaula);
    atualizarJaulas();
};

// DEFINIR TIPOS PERMITIDOS NA JAULA
btSalvarNovoTipoParaJaula.onclick = () => {
    const jaula = jaulas.find(j => j.identificador == idJaulaSetTipos.value);
    if (!jaula) return alert("Jaula não encontrada");

    const tipo = AnimalPermitidoJaula.value;
    for (let map of Object.values(mapaClasses)) {
        if (map.has(tipo)) {
            jaula.tiposPermitidos.push(map.get(tipo));
        }
    }
    atualizarJaulas();
};

// ENJAULAR ANIMAL
btEnjaular.onclick = () => {
    const animal = animais.find(a => a.id == enjaularIdAnimal.value);
    const jaula = jaulas.find(j => j.identificador == enjaularIdJaula.value);

    if (!animal || !jaula) {
        alert("Animal ou Jaula não encontrados");
        return;
    }

    if (!jaula.adicionarAnimal(animal)) {
        alert("Não foi possível enjaular (regras violadas)");
    }

    atualizarJaulas();
};

// MOSTRAR JAULAS (código do professor)
function atualizarJaulas() {
    const aside = document.getElementById("area-jaulas");
    aside.querySelectorAll(".jaula-card:not(.template)").forEach(e => e.remove());

    jaulas.forEach(j => mostrarJaulas(j));
}

function mostrarJaulas(jaula) {
    const aside = document.getElementById("area-jaulas");
    const template = aside.querySelector(".jaula-card.template");
    const card = template.cloneNode(true);
    card.classList.remove("template");
    card.style.display = "";

    card.querySelector(".nome-jaula").textContent = jaula.nome;
    card.querySelector(".id-jaula").textContent = "ID: " + jaula.identificador;

    // Tipos permitidos
    const ulTipos = card.querySelector(".tipos-permitidos");
    ulTipos.innerHTML = "";
    jaula.tiposPermitidos.forEach(tp => {
        const li = document.createElement("li");
        li.textContent = tp.name;
        ulTipos.appendChild(li);
    });

    // Animais na jaula
    const ulAnimais = card.querySelector(".lista-animais");
    ulAnimais.innerHTML = "";
    jaula.animais.forEach(animal => {
        const li = document.createElement("li");
        li.textContent = animal.id + " (" + animal.constructor.name + ")";
        ulAnimais.appendChild(li);
    });

    aside.appendChild(card);
}

// Popular selects de animais ao carregar a página
selectedClasseAnimal.onchange();
classeAnimalTp1.onchange();
classeAnimalTp2.onchange();
ClasseAnimalPermitidoJaula.onchange();
