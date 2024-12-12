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
const iconeId = document.getElementById("icone")
let icone = document.getElementById("imagemUsuario")
const camera = document.getElementById("cameraIcone")
const divMudarIcone = document.getElementById("divMudarIcone")

// iconeId.addEventListener("click",() => {
//     divMudarIcone.classList.toggle("desaparecer")
//     divMudarIcone.classList.toggle("aparecer")
// })

camera.addEventListener("click",() => {
    divMudarIcone.classList.toggle("desaparecer")
    divMudarIcone.classList.toggle("aparecer")
})

const iconeSelecionado = document.getElementById("iconeEscolhidoUsuario")
let iconeUsuario = document.getElementById("imagemUsuario")

function mudarIcone() {
    if(iconeSelecionado.value) {
    usuarioLogado[0].imagem = iconeSelecionado.value
    localStorage.setItem("usuariosCadastradosLocal",JSON.stringify(arrayArmazenamentoUsuario))
    iconeSelecionado.value = ""
    divMudarIcone.classList.toggle("desaparecer")
    divMudarIcone.classList.toggle("aparecer")

    renderizarPerfil()
    }
}

function renderizarPerfil() {
    nomeTopo.textContent = usuarioLogado[0].nome
    informacaoNome.textContent = usuarioLogado[0].nome
    informacaoEmail.textContent = usuarioLogado[0].email
    mensagemMiniChat.textContent = usuarioLogado[0].nome
    temImagem()
}

function irParaChat() {
    window.location = `chat.html?id=${identificadorUsuarioLogado}`
}

renderizarPerfil()

function temImagem() {
    if (usuarioLogado[0].imagem == "") {
        const iconeId = document.getElementById("icone")
        const iconeLetra = document.createElement("div")
        iconeId.insertBefore(iconeLetra,camera)
        iconeLetra.id = "imagemLetra"
        iconeLetra.textContent = usuarioLogado[0].letraInicial
        iconeLetra.style.backgroundColor =  usuarioLogado[0].corDeFundo
    } else {
        if (!icone) {
            const imagem = document.createElement("img")
            imagem.id = "imagemUsuario"
            iconeId.insertBefore(imagem,camera)
            const iconeLetra = document.getElementById("imagemLetra")
            if (iconeLetra) {
                iconeId.removeChild(iconeLetra)
            }
        }
        icone = document.getElementById("imagemUsuario")
        iconeUsuario = document.getElementById("imagemUsuario")
        iconeMiniChat.setAttribute("src",usuarioLogado[0].imagem)
        iconeUsuario.setAttribute("src",usuarioLogado[0].imagem)
    }
}