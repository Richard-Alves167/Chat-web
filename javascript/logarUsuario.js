let usuarios = []
// let logarUsuarioAoLocalStorage = []
// let usuarioLogadoSite = []

let Admin = {
    nome: "Zoe Admin",
    senha: 2018,
    imagem: "https://i.pinimg.com/736x/b2/51/1d/b2511d14b09210441c2fc4ea5e4eace0.jpg",
    telefone: "/-------/",
    endereco: "/-------/",
    email: "/-------/",
}

const armazenamentoUsuarios = localStorage.getItem("usuariosCadastradosLocal")

if (armazenamentoUsuarios !== null) {
    usuarios = JSON.parse(armazenamentoUsuarios)
}
//     const adminStorage = usuarios.filter((element) => {
//         element.nome == "Zoe Admin"

//     })
//         if (adminStorage.length == 0) {
//             usuarios.push(Admin)
//         }
// }
// if (clienteLogadoSite !== null) {
//     usuarioLogadoSite = JSON.parse(clienteLogadoSite)
// }

function logarUsuario() {
    const nomeColocado = document.getElementById("nomeLogin")
    const senhaColocada = document.getElementById("senhaLogin")
    const verificar = usuarios.filter((element) => {
        if(nomeColocado.value == element.nome && senhaColocada.value == element.senha) {
            // const nomeSpan = document.getElementById("preencherLoginNome")
            // nomeSpan.style.display = "none"
            // nomeColocado.style.border = "none"
            // nomeColocado.style.borderBottom = "1px solid black"
            // const senhaSpan = document.getElementById("preencherLoginSenha")
            // senhaSpan.style.display = "none"
            // senhaColocada.style.border = "none"
            // senhaColocada.style.borderBottom = "1px solid black"
            return element
        }
        //  else {
        //     if (!(nomeColocado.value != element.nome && senhaColocada.value == element.senha)) {
        //         const nomeSpan = document.getElementById("preencherLoginNome")
        //         nomeSpan.style.display = "block"
        //         nomeColocado.style.border = "1px red solid"
        //         } else {
        //             const nomeSpan = document.getElementById("preencherLoginNome")
        //             nomeSpan.style.display = "none"
        //             nomeColocado.style.border = "none"
        //             nomeColocado.style.borderBottom = "1px solid black"
        //         }
        
        //     if (!(nomeColocado == element.nome && senhaColocada != element.senha)) {
        //             const senhaSpan = document.getElementById("preencherLoginSenha")
        //             senhaSpan.style.display = "block"
        //             senhaColocada.style.border = "1px red solid"
        //         }else {
        //             const senhaSpan = document.getElementById("preencherLoginSenha")
        //             senhaSpan.style.display = "none"
        //             senhaColocada.style.border = "none"
        //             senhaColocada.style.borderBottom = "1px solid black"
        //         }
        // }
    })

    if (verificar[0] != null) {
        window.location = `paginaPerfil.html?id=${verificar[0].id}`
    }

}

// if (clienteLogadoSite !== null) {
//     const ancora = document.getElementById("linkagemPaginaUsuario")
//     const imagem = document.getElementById("user_login_Imagem")
//     const nomePerfilUsuario = document.getElementById("nomePerfilUsuario")
//     nomePerfilUsuario.textContent = "Bem Vindo " + usuarioLogadoSite[0].nome.split(" ")[0]
//     ancora.setAttribute("href","../Home/telaDoUsuario.html")
//     imagem.setAttribute("src",usuarioLogadoSite[0].imagem)
// }

// if (JSON.parse(clienteLogadoSite)[0].nome == Admin.nome) {
//     let cadastrar = document.getElementById("botaoListaCadastrados")
//     let texto = document.getElementById("textoListaCadastros")
//     if (texto && cadastrar) {
//     cadastrar.style.display = "flex"
//     texto.style.display = "flex"
//     }
        
// }

// const botaoCadastros = document.getElementById("botaoListaCadastrados")
// const listaCadastrados = document.getElementById("listaCadastrados")
// const trianguloCadastros = document.getElementById("trianguloListaCadastros")
// const textoCadastros = document.getElementById("textoListaCadastros")

// botaoCadastros.addEventListener("click",() => {
//     listaCadastrados.classList.toggle("desaparecer")
//     listaCadastrados.classList.toggle("aparecer")
//     trianguloCadastros.classList.toggle("desaparecer")
//     trianguloCadastros.classList.toggle("aparecer")
//     textoCadastros.classList.toggle("desaparecer")
// })

