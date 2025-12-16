class Filme {
    constructor(codigo, titulo, duracao){
        this.codigo = codigo
        this.titulo = titulo
        this.duracao = duracao
    }
}

class FilmeComum extends Filme{
    constructor(codigo, titulo, duracao){
        super(codigo, titulo, duracao)
    }
}

class FilmeInfantil extends Filme {
    constructor(codigo, titulo, duracao, horario){
        super(codigo, titulo, duracao)
        this.horario <= 22;
    }
}

class FilmeInfantil extends Filme{
    constructor(codigo, titulo, duracao, idade){
        super(codigo, duracao, titulo)
        this.idade >= 18
    }
}

class Cinema{
    constructor(){
        this.filmes = []
        this.sessoes = []
    }

    cadastrarFilme(filme){

    }

    iniciarSessao(codigo, horario){

    }

    encerrarSessao(codigo){

    }

    listarSessoesAtivas(){

    }

    listarHistoricoSessoes(){
        
    }
}