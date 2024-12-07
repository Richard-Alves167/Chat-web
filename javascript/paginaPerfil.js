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

console.log(usuarioLogado[0])

const nomeTopo = document.getElementById("nomeUsuarioColocado")
const informacaoNome = document.getElementById("nomeUsuario")
const informacaoEmail = document.getElementById("emailUsuario")
const mensagemMiniChat = document.querySelector(".textoMensagemUsuario")
const iconeMiniChat = document.querySelector(".iconeMensagemOutroUsuario")
const icone = document.getElementById("imagemUsuario")
const camera = document.getElementById("cameraIcone")
const divMudarIcone = document.getElementById("divMudarIcone")

icone.addEventListener("click",() => {
    divMudarIcone.classList.toggle("desaparecer")
    divMudarIcone.classList.toggle("aparecer")
})

camera.addEventListener("click",() => {
    divMudarIcone.classList.toggle("desaparecer")
    divMudarIcone.classList.toggle("aparecer")
})

const iconeSelecionado = document.getElementById("iconeEscolhidoUsuario")
const iconeUsuario = document.getElementById("imagemUsuario")

function mudarIcone() {
    usuarioLogado[0].imagem = iconeSelecionado.value
    localStorage.setItem("usuariosCadastradosLocal",JSON.stringify(arrayArmazenamentoUsuario))
    iconeSelecionado.value = ""
    divMudarIcone.classList.toggle("desaparecer")
    divMudarIcone.classList.toggle("aparecer")
    renderizarPerfil()
}

function renderizarPerfil() {
    nomeTopo.textContent = usuarioLogado[0].nome
    informacaoNome.textContent = usuarioLogado[0].nome
    informacaoEmail.textContent = usuarioLogado[0].email
    mensagemMiniChat.textContent = usuarioLogado[0].nome
    iconeMiniChat.setAttribute("src",usuarioLogado[0].imagem)
    iconeUsuario.setAttribute("src",usuarioLogado[0].imagem)
}

function irParaChat() {
    window.location = `chat.html?id=${identificadorUsuarioLogado}`
}

renderizarPerfil()
