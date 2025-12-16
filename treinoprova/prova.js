//Desenvolver um sistema simples de controle de uma biblioteca,
// registrando empréstimos e devoluções de livros,
// utilizando HTML + JavaScript, com foco em Programação Orientada a Objetos.

class Livros {
  constructor(codigo, titulo, autor) {
    this.codigo = codigo;
    this.titulo = titulo;
    this.autor = autor;
    this.emprestado = false;
  }
  emprestar() {
    if (this.emprestado) {
      console.log(`${this.titulo} está emprestado!`);
      return false;
    }

    this.emprestado = true;
    return true;
  }

  devolver() {
    if (this.emprestado == false) {
      console.log(`${this.titulo} não está registrado`);
      return;
    }

    this.emprestado = false;
    console.log(`${this.titulo} foi devolvido com sucesso!`);
  }
}

class LivroComum extends Livros {
  constructor(codigo, titulo, autor) {
    super(codigo, titulo, autor);
    this.prazoMaximo = 14;
  }
}

class LivroReferencia extends Livros {
  constructor(codigo, titulo, autor) {
    super(codigo, titulo, autor);
    this.prazoMaximo = null;
  }

  emprestar() {
    console.log("Livro de referência não pode ser emprestado");
    return false;
  }
}

class LivroInfantil extends Livros {
  constructor(codigo, titulo, autor) {
    super(codigo, titulo, autor);
    this.prazoMaximo = 7;
  }
}

class RegistroEmprestimo {
  constructor(livro, dataIn = new Date()) {
    this.livro = livro;
    this.dataIn = dataIn;
    this.dataOut = null;
  }

  devolver() {
    this.dataOut = new Date();
    this.livro.devolver();
  }
}

class Biblioteca {
  constructor() {
    this.livros = [];
    this.registros = [];
  }

  cadastrarLivro(livro) {
    if (this.livros.some(l => l.codigo === livro.codigo )){
        console.log("Livro já cadastrado")
        return;
    }
    this.livros.push(livro);
  }

  emprestarLivro(codigo) {
    const livro = this.livros.find((l) => l.codigo === codigo);
    if (!livro) {
      console.log("Livro não encontrado");
      return;
    }

    if (livro.emprestar()) {
      this.registros.push(new RegistroEmprestimo(livro));
    }
  }

  devolverLivro(codigo) {
    const registro = this.registros.find(
      (r) => r.livro.codigo === codigo && r.dataOut === null
    );
    if (!registro) {
      console.log("Empréstimo de livro não ativo");
      return;
    }
    registro.devolver();
  }

  listarLivrosEmprestados() {
    const emprestados = this.registros.filter((r) => r.dataOut === null);
    console.log(emprestados);
  }

  listarHistoricoEmprestimos() {
    console.log(this.registros);
  }
}

const biblioteca = new Biblioteca();
const saida = document.getElementById("saida");

function cadastrar() {
    const codigo = Number(document.getElementById("codigo").value);
    const titulo = document.getElementById("titulo").value;
    const autor = document.getElementById("autor").value;
    const tipo = document.getElementById("tipo").value;

    let livro;

    if (tipo === "comum") {
        livro = new LivroComum(codigo, titulo, autor);
    } else if (tipo === "referencia") {
        livro = new LivroReferencia(codigo, titulo, autor);
    } else {
        livro = new LivroInfantil(codigo, titulo, autor);
    }

    biblioteca.cadastrarLivro(livro);
    saida.textContent = "Livro cadastrado com sucesso!";
}

function emprestar() {
    const codigo = Number(document.getElementById("codigoLivro").value);
    biblioteca.emprestarLivro(codigo);
    saida.textContent = "Tentativa de empréstimo realizada.";
}

function devolver() {
    const codigo = Number(document.getElementById("codigoLivro").value);
    biblioteca.devolverLivro(codigo);
    saida.textContent = "Tentativa de devolução realizada.";
}

function listarEmprestados() {
    saida.textContent = JSON.stringify(
        biblioteca.registros.filter(r => r.dataOut === null),
        null,
        2
    );
}

function listarHistorico() {
    saida.textContent = JSON.stringify(biblioteca.registros, null, 2);
}
