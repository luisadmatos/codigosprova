class Filme {
    constructor(codigo, titulo, duracao){
        this.codigo = codigo
        this.titulo = titulo
        this.duracao = duracao
    }

    podeExibir(horario,idade){
        return true;
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
    }

    podeExibir(horario,idade){
        return horario <= 22;
    }
}

class FilmeAdulto extends Filme{
    constructor(codigo, titulo, duracao, idade){
        super(codigo, titulo, duracao)
    }

    podeExibir(horario,idade){
        return idade >= 18;
    }
}

class RegistroSessao{
    constructor(filme, horarioInicio){
        this.filme = filme
        this.horarioIn = horarioInicio
        this.horarioFim = null;
    }

    encerrar(horarioFim){
        this.horarioFim = horarioFim;
    }
}

class Cinema{
    constructor(){
        this.filmes = []
        this.sessoes = []
    }

    cadastrarFilme(filme){
        if (this.filmes.some(f => f.codigo === filme.codigo)){
            console.log("Filme já cadastrado")
            return
        }
        this.filmes.push(filme)
        }

    iniciarSessao(codigo, horario, idade){
        const filme = this.filmes.find((f) => f.codigo === codigo);
        if (!filme){
            console.log("Filme não encontrado")
            return;
        }

        if (!filme.podeExibir(horario,idade)) {
            console.log("Sessão não permitida")
            return;
        }

        const sessao = new RegistroSessao(filme, horario)
        this.sessoes.push(sessao)

        console.log(`Sessão iniciada: ${filme.titulo} às ${horario}`)

    }

    encerrarSessao(codigo){
        const sessao = this.sessoes.find(
            (s) => s.filme.codigo === codigo && s.horarioFim === null
        );

        if (!sessao){
            console.log("Sessão inexistente")
            return;
        }
        sessao.encerrar(horarioFim)
        console.log(`Sessão encerrada: ${sessao.filme.titulo}`)
    }

    listarSessoesAtivas() {
        this.sessoes
        .filter(s => s.horarioFim === null)
        .forEach(s=> {
            console.log(`${s.filme.titulo} | Início: ${s.horarioIn}`)
        })  
    }

    listarHistoricoSessoes() {
        console.log(this.sessoes);
    }
}