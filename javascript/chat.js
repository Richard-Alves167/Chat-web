let armazenamentoUsuario = localStorage.getItem("usuariosCadastradosLocal")
let arrayArmazenamentoUsuario = []

if (armazenamentoUsuario != null) {
    arrayArmazenamentoUsuario = JSON.parse(armazenamentoUsuario)
}

const URLparametros = new URLSearchParams(window.location.search);
const identificadorUsuarioLogado = URLparametros.get("id")

const usuarioLogado = arrayArmazenamentoUsuario.filter((usuario) => {
    return usuario.id == identificadorUsuarioLogado
})

let arrayMensagensArmazenamento = []
let armazenamentoMensagens = localStorage.getItem("mensagensLocal")

if (armazenamentoMensagens != null) {
    arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
}

const chatMensagens = document.getElementById("listaMensagens")
const mensagemInput = document.getElementById("mensagemEscrita")
chatMensagens.style.paddingBottom = "5vw"

class Mensagem {
    constructor(identificacao, dataEnvio, mensagem) {
      this.id = identificacao;
      this.data = dataEnvio;
      this.texto = mensagem;
    }
}

function criarMensagem() {
    if (mensagemInput.value != "") {
    let novaMensagem = new Mensagem(usuarioLogado[0].id, (new Date).toDateString(), mensagemInput.value)

    arrayMensagensArmazenamento.push(novaMensagem)
    localStorage.setItem("mensagensLocal",JSON.stringify(arrayMensagensArmazenamento))
    mensagemInput.value = ""
    renderizarMensagens()
    chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
    }
}

function renderizarMensagens() {
    armazenamentoMensagens = localStorage.getItem("mensagensLocal")

    if (armazenamentoMensagens != null) {
        arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
    }
    const identificadorConversa = URLparametros.get("conversa")
    if (identificadorConversa == "grupo") {
        chatMensagens.innerHTML = ""

        chatMensagens.innerHTML = `
        <li id="novaConversa">Nova Conversa</li>
        `
        arrayMensagensArmazenamento.forEach((object)=> {

            if (object.id == usuarioLogado[0].id) {
                    const usuarioLogadoMensagem = arrayArmazenamentoUsuario.filter((usuario => {
                        return usuario.id == usuarioLogado[0].id
                    }))
                let mensagemUsuarioLogado = document.createElement("li")
                mensagemUsuarioLogado.classList.add("mensagemUsuarioLogado")

                if (usuarioLogadoMensagem[0].imagem) {
                    mensagemUsuarioLogado.innerHTML = `
                    <p class="textoMensagemUsuarioLogado">${object.texto}</p>
                    <span class="dataMensagemUsuarioLogado">${object.data}</span>
                    <img src="${usuarioLogadoMensagem[0].imagem}" class="iconeMensagemUsuarioLogado">
                    `
                } else {
                    mensagemUsuarioLogado.innerHTML = `
                    <p class="textoMensagemUsuarioLogado">${object.texto}</p>
                    <span class="dataMensagemUsuarioLogado">${object.data}</span>
                    <span class="iconeLetraMensagemUsuarioLogado" style="background-color: ${usuarioLogado[0].corDeFundo}">${usuarioLogado[0].letraInicial}</span>
                    `
                }
                chatMensagens.appendChild(mensagemUsuarioLogado)
            } else {
                    const usuarioMensagem = arrayArmazenamentoUsuario.filter((usuario => {
                        return usuario.id == object.id
                    }))
                let mensagem = document.createElement("li")
                mensagem.classList.add("mensagem")
                if (usuarioMensagem[0].imagem) {
                    mensagem.innerHTML = `
                    <img src="${usuarioMensagem[0].imagem}" class="iconeMensagem">
                    <p class="textoMensagem">${object.texto}</p>
                    <p class="nomeMensagem">${usuarioMensagem[0].nome}</p>
                    <span class="dataMensagem">${object.data}</span>
                    `
                } else {
                    mensagem.innerHTML = `
                    <span class="iconeMensagemLetra" style="background-color: ${usuarioMensagem[0].corDeFundo}">${usuarioMensagem[0].letraInicial}</span>
                    <p class="textoMensagem">${object.texto}</p>
                    <p class="nomeMensagem">${usuarioMensagem[0].nome}</p>
                    <span class="dataMensagem">${object.data}</span>
                    `
                }
                chatMensagens.appendChild(mensagem)
            }
        })
    }
    chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
}

mensagemInput.addEventListener("keydown", (tecla) => {
    if (tecla.key == "Enter") {
        criarMensagem()
    }
})
renderizarMensagens()

const perfilUsuarioChat = document.getElementById("perfilConversa")
const listaConversas = document.getElementById("listaConversas")

function renderizarConversas() {
    if (usuarioLogado[0].imagem) {
        perfilUsuarioChat.innerHTML = `
        <img src="${usuarioLogado[0].imagem}"><p>${usuarioLogado[0].nome}</p>
        <span id="voltarPerfil" onclick="irParaPerfil()">Voltar ao perfil</span>
        `
    } else {
        perfilUsuarioChat.innerHTML = `
        <span id="contaLogadaTopoConversa" style="background-color: ${usuarioLogado[0].corDeFundo}">${usuarioLogado[0].letraInicial}</span><p>${usuarioLogado[0].nome}</p>
        <span id="voltarPerfil" onclick="irParaPerfil()">Voltar ao perfil</span>
        `
    }

    arrayArmazenamentoUsuario.forEach((usuario) => {
        if(usuario.id != usuarioLogado[0].id) {
            let conversa = document.createElement("li")
            conversa.setAttribute("onclick",`conversa(${usuario.id})`)
            conversa.classList.add("conversa")
            if(usuario.imagem)
                conversa.innerHTML = `
                <img src="${usuario.imagem}">
                <p>${usuario.nome}</p>
                `
            else {
                conversa.innerHTML = `
                <span style="background-color: ${usuario.corDeFundo}">${usuario.letraInicial}</span>
                <p>${usuario.nome}</p>
                `
            }
            listaConversas.appendChild(conversa)
        }
    })
}
renderizarConversas()

function conversa(idUsuario) {
        window.location = `chat.html?id=${identificadorUsuarioLogado}&converva=${usuarioLogado[0].id}e${idUsuario}`
}

function conversaGrupo() {
    window.location = `chat.html?id=${identificadorUsuarioLogado}&conversa=grupo`
}

function irParaPerfil() {
    window.location = `paginaPerfil.html?id=${identificadorUsuarioLogado}`
}

window.addEventListener("storage",renderizarMensagens)
//const searchParams = new URLSearchParams(window.location.search)

console.log(usuarioLogado[0].nome[0].toLowerCase())