class Usuario {
    constructor (nome,imagem, data, mensagem){
        this.nome = nome;
        this.icone = imagem;
        this.data = data;
        this.texto = mensagem;
    }
}

let arrayMensagensArmazenamento = []
let armazenamentoMensagens = localStorage.getItem("mensagensLocal")

if (armazenamentoMensagens != null) {
    arrayMensagensArmazenamento = JSON.parse(armazenamentoMensagens)
}

const chatMensagens = document.getElementById("listaMensagens")
const mensagemInput = document.getElementById("mensagemEscrita")
chatMensagens.style.paddingBottom = "5vw"

function criarMensagem() {
    if (mensagemInput.value != "") {
    let novoUsuario = new Usuario("Richard","https://preview.redd.it/zqb5gkxwnbib1.jpg?auto=webp&s=c8bd1e8b2c841bfa6f193008432f0793ad4da899", (new Date).toDateString(), mensagemInput.value)

    arrayMensagensArmazenamento.push(novoUsuario)
    localStorage.setItem("mensagensLocal",JSON.stringify(arrayMensagensArmazenamento))
    mensagemInput.value = ""
    renderizarMensagens()
    chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
    }
}

function renderizarMensagens() {
    chatMensagens.innerHTML = ""

    chatMensagens.innerHTML = `
    <li id="novaConversa">Nova Conversa</li>
    `

    arrayMensagensArmazenamento.forEach((object)=> {
        if (object.nome == "Richard") {
        let mensagemUsuarioLogado = document.createElement("li")
        mensagemUsuarioLogado.classList.add("mensagemUsuarioLogado")
        mensagemUsuarioLogado.innerHTML = `
        <p class="textoMensagemUsuarioLogado">${object.texto}</p>
        <span class="dataMensagemUsuarioLogado">${object.data}</span>
        <img src="${object.icone}" class="iconeMensagemUsuarioLogado">
        `
        chatMensagens.appendChild(mensagemUsuarioLogado)
        } else {
        let mensagem = document.createElement("li")
        mensagem.classList.add("mensagem")
        mensagem.innerHTML = `
        <img src="${object.icone}" class="iconeMensagem">
        <p class="textoMensagem">${object.texto}</p>
        <p class="nomeMensagem">${object.nome}</p>
        <span class="dataMensagem">${object.data}</span>
        `
        chatMensagens.appendChild(mensagem)
        }
    })
    chatMensagens.scrollTo(0,chatMensagens.scrollHeight)
}

mensagemInput.addEventListener("keydown", (tecla) => {
    if (tecla.key == "Enter") {
        criarMensagem()
    }
})

renderizarMensagens()

//const searchParams = new URLSearchParams(window.location.search)