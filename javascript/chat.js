let armazenamentoUsuario = localStorage.getItem("usuariosCadastradosLocal")
let arrayArmazenamentoUsuario = []

if (armazenamentoUsuario != null) {
    arrayArmazenamentoUsuario = JSON.parse(armazenamentoUsuario)
}

const URLparametros = new URLSearchParams(window.location.search);
const identificadorUsuarioLogado = URLparametros.get("id")
const identificadorConversa = URLparametros.get("conversa")

const usuarioLogado = arrayArmazenamentoUsuario.filter((usuario) => {
    return usuario.id == identificadorUsuarioLogado
})

console.log(identificadorConversa)

let arrayMensagensArmazenamento = []
if (identificadorConversa != "grupo" && identificadorConversa != null ) {
    let armazenamentoMensagens = localStorage.getItem(`conversa${identificadorConversa[0]}e${identificadorConversa[2]}`) || localStorage.getItem(`conversa${identificadorConversa[2]}e${identificadorConversa[0]}`)    
    if (armazenamentoMensagens != null) {
        arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
    }
} else if (identificadorConversa == "grupo") {
    let armazenamentoMensagens = localStorage.getItem("mensagensLocal")
    if (armazenamentoMensagens != null) {
        arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
    }
}

const chatMensagens = document.getElementById("listaMensagens")
const mensagemInput = document.getElementById("mensagemEscrita")
chatMensagens.style.paddingBottom = "5vw"

function renderizarTelaConversa() {
    const topoConversa = document.getElementById("topoConversa")
    let div = document.createElement("div")
    div.id = "topoConversaInformacoes"
    const imagemIconeSite = document.createElement("img")
    imagemIconeSite.setAttribute("src","./imagens/MoChatOn.png")
    if (identificadorConversa != "grupo" && identificadorConversa != null) {
        const identificadorDaConversaUsuarioPrivado = identificadorConversa[2]
        const usuarioConversa = arrayArmazenamentoUsuario.filter((usuario) => {
            return usuario.id == identificadorDaConversaUsuarioPrivado
        })
        console.log(usuarioConversa)
        console.log(identificadorDaConversaUsuarioPrivado)
        div.innerHTML = `
        <img src="${usuarioConversa[0].imagem}">
        <p id="nomeConversa">${usuarioConversa[0].nome}</p>
        `
        topoConversa.appendChild(div)
        topoConversa.appendChild(imagemIconeSite)
    } else if (identificadorConversa == "grupo") {
        div.innerHTML = `
        <img src="https://w7.pngwing.com/pngs/987/288/png-transparent-league-of-legends-defense-of-the-ancients-computer-icons-league-of-legends-purple-text-video-game.png" alt="">
        <p id="nomeConversa">Os Lolzeiros</p>
        `
        topoConversa.appendChild(div)
        topoConversa.appendChild(imagemIconeSite)
    }
}
renderizarTelaConversa()

class Mensagem {
    constructor(identificacao, mensagem, dataEnvio = new Date()) {
      this.id = identificacao;
      this.data = dataEnvio;
      this.texto = mensagem;
    }
}

function criarMensagem() {
    if (mensagemInput.value != "") {
    let novaMensagem = new Mensagem(usuarioLogado[0].id, mensagemInput.value)

    arrayMensagensArmazenamento.push(novaMensagem)
    if (identificadorConversa != "grupo" && identificadorConversa != null) {  
        localStorage.setItem(`conversa${identificadorConversa[0]}e${identificadorConversa[2]}` || `conversa${identificadorConversa[2]}e${identificadorConversa[0]}`,JSON.stringify(arrayMensagensArmazenamento))
    } else if (identificadorConversa == "grupo") {
        localStorage.setItem("mensagensLocal",JSON.stringify(arrayMensagensArmazenamento))
    }
    mensagemInput.value = ""
    renderizarMensagens()
    chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
    }
}

function renderizarMensagens() {
    if (identificadorConversa != "grupo" && identificadorConversa != null) {
        armazenamentoMensagens = localStorage.getItem(`conversa${identificadorConversa[0]}e${identificadorConversa[2]}` || `conversa${identificadorConversa[2]}e${identificadorConversa[0]}`,JSON.stringify(arrayMensagensArmazenamento))
        arrayArmazenamentoUsuario = JSON.parse(localStorage.getItem("usuariosCadastradosLocal"))

        if (armazenamentoMensagens != null) {
            arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
        }
        if (identificadorConversa != "grupo" && identificadorConversa != null) {

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
                        <span class="dataMensagemUsuarioLogado">${new Date(object.data).toLocaleString()}</span>
                        <img src="${usuarioLogadoMensagem[0].imagem}" class="iconeMensagemUsuarioLogado">
                        `
                    } else {
                        mensagemUsuarioLogado.innerHTML = `
                        <p class="textoMensagemUsuarioLogado">${object.texto}</p>
                        <span class="dataMensagemUsuarioLogado">${new Date(object.data).toLocaleString()}</span>
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
                        <span class="dataMensagem">${new Date(object.data).toLocaleString()}</span>
                        `
                    } else {
                        mensagem.innerHTML = `
                        <span class="iconeMensagemLetra" style="background-color: ${usuarioMensagem[0].corDeFundo}">${usuarioMensagem[0].letraInicial}</span>
                        <p class="textoMensagem">${object.texto}</p>
                        <p class="nomeMensagem">${usuarioMensagem[0].nome}</p>
                        <span class="dataMensagem">${new Date(object.data).toLocaleString()}</span>
                        `
                    }
                    chatMensagens.appendChild(mensagem)
                }
            })
        }
        chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
    } else if (identificadorConversa == "grupo") {
        armazenamentoMensagens = localStorage.getItem("mensagensLocal")
        arrayArmazenamentoUsuario = JSON.parse(localStorage.getItem("usuariosCadastradosLocal"))

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
                        <span class="dataMensagemUsuarioLogado">${new Date(object.data).toLocaleString()}</span>
                        <img src="${usuarioLogadoMensagem[0].imagem}" class="iconeMensagemUsuarioLogado">
                        `
                    } else {
                        mensagemUsuarioLogado.innerHTML = `
                        <p class="textoMensagemUsuarioLogado">${object.texto}</p>
                        <span class="dataMensagemUsuarioLogado">${new Date(object.data).toLocaleString()}</span>
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
                        <span class="dataMensagem">${new Date(object.data).toLocaleString()}</span>
                        `
                    } else {
                        mensagem.innerHTML = `
                        <span class="iconeMensagemLetra" style="background-color: ${usuarioMensagem[0].corDeFundo}">${usuarioMensagem[0].letraInicial}</span>
                        <p class="textoMensagem">${object.texto}</p>
                        <p class="nomeMensagem">${usuarioMensagem[0].nome}</p>
                        <span class="dataMensagem">${new Date(object.data).toLocaleString()}</span>
                        `
                    }
                    chatMensagens.appendChild(mensagem)
                }
            })
        }
        chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
    }
}

mensagemInput.addEventListener("keydown", (tecla) => {
    if (tecla.key == "Enter") {
        criarMensagem()
    }
})
renderizarMensagens()

function renderizarConversas() {
    const perfilUsuarioChat = document.getElementById("perfilConversa")
const listaConversas = document.getElementById("listaConversas")
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
        window.location = `chat.html?id=${identificadorUsuarioLogado}&conversa=${usuarioLogado[0].id}e${idUsuario}`
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

const imagemPrincipal = document.getElementById("divPrincipal")
const inputMensagem = document.getElementById("escreverMensagem")
const novaConversa = document.getElementById("novaConversa")

if (identificadorConversa) {
    imagemPrincipal.style.display = "none"
} else {
    inputMensagem.style.display = "none"
    novaConversa.style.display = "none"
}

