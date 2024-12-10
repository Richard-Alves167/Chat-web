let usuarios = []

const armazenamentouUsuarios = localStorage.getItem("usuariosCadastradosLocal")

if (armazenamentouUsuarios !== null) {
    usuarios = JSON.parse(armazenamentouUsuarios)
}

function cadastrarUsuario() {
    class Usuario {
        constructor(nome, email, senha, letra, identificacao) {
          this.nome = nome;
          this.email = email;
          this.senha = senha;
          this.imagem = "";
          this.letraInicial = letra;
          this.corDeFundo = `rgb(${(Math.random() * (250 - 180) + 180).toFixed(0)},${(Math.random() * (250 - 180) + 180).toFixed(0)},${(Math.random() * (250 - 180) + 180).toFixed(0)})`
          this.id = identificacao;
        }
    }

    const nomeUsuario = document.getElementById("nomeUsuario")
    const emailUsuario = document.getElementById("emailUsuario")
    const senhaUsuario = document.getElementById("senhaUsuario")

    if (nomeUsuario.value != "" && emailUsuario.value != "" && senhaUsuario.value != "") {

    const usuario = new Usuario(nomeUsuario.value, emailUsuario.value, senhaUsuario.value, nomeUsuario.value[0], usuarios.length)

    usuarios.push(usuario)

    localStorage.setItem("usuariosCadastradosLocal",JSON.stringify(usuarios))

    document.getElementById("nomeUsuario").value = null
    document.getElementById("emailUsuario").value = null
    document.getElementById("senhaUsuario").value = null

    alert("cadastro Bem Sucedido")
    window.location = "inicio_LogarUsuario.html"
    } else {
        if (nomeUsuario.value == "") {
        const nomeSpan = document.getElementById("preencherCampoCadastroNome")
        nomeSpan.style.display = "block"
        nomeUsuario.style.border = "1px red solid"
        nomeUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(240, 57, 124),rgb(255, 41, 41))"
        } else {
            const nomeSpan = document.getElementById("preencherCampoCadastroNome")
            nomeSpan.style.display = "none"
            nomeUsuario.style.border = "none"
            nomeUsuario.style.borderBottom = "4px solid rgb(46, 46, 46)"
            nomeUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(221, 110, 208),rgb(255, 41, 251))"
        }

        if (emailUsuario.value == "") {
            const emailSpan = document.getElementById("preencherCampoCadastroEmail")
            emailSpan.style.display = "block"
            emailUsuario.style.border = "1px red solid"
            emailSpan.textContent = "Todos os campos devem ser preenchidos."
            emailUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(240, 57, 124),rgb(255, 41, 41))"
        } else if (!(emailUsuario.value).includes("@")) {
            const emailSpan = document.getElementById("preencherCampoCadastroEmail")
            emailSpan.style.display = "block"
            emailUsuario.style.border = "1px red solid"
            emailSpan.textContent = "Não é um Email válido."
            emailUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(240, 57, 124),rgb(255, 41, 41))"
        } else {
            const emailSpan = document.getElementById("preencherCampoCadastroEmail")
            emailSpan.style.display = "none"
            emailUsuario.style.border = "none"
            emailUsuario.style.borderBottom = "4px solid rgb(46, 46, 46)"
            emailUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(221, 110, 208),rgb(255, 41, 251))"
        }

        if (senhaUsuario.value == "") {
            const senhaSpan = document.getElementById("preencherCampoCadastroSenha")
            senhaSpan.style.display = "block"
            senhaUsuario.style.border = "1px red solid"
            senhaUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(240, 57, 124),rgb(255, 41, 41))"
        }else {
            const senhaSpan = document.getElementById("preencherCampoCadastroSenha")
            senhaSpan.style.display = "none"
            senhaUsuario.style.border = "none"
            senhaUsuario.style.borderBottom = "4px solid rgb(46, 46, 46)"
            senhaUsuario.style.backgroundImage = "linear-gradient(to right, rgb(204, 204, 204), rgb(221, 110, 208),rgb(255, 41, 251))"
        }
    }
}

// const tabela = document.getElementById("tabelaUsuarioesCadastrados")

// function renderizarTabela() {
//         tabela.innerHTML = ""

//         usuarios.forEach(object => {
//             let novotr = document.createElement("tr")

//             novotr.innerHTML =`
//             <td><button class="tabelaBotao" onclick="removerProduto(${usuarios.indexOf(object)})">X</button></td>
//             <td><img class="iconeUsuario" src="${object.imagem}"></td>
//             <td>${object.nome}</td>
//             <td>${object.email}</td>
//             <td>${object.telefone}</td>
//             <td>${object.endereco}</td>
//             `
//             tabela.appendChild(novotr)
//         }); 
// }

// function removerProduto(index) {
//     usuarios.splice(index,1)

//     localStorage.setItem("usuarioLocal", JSON.stringify(usuarios))

//     renderizarTabela()
// }

// renderizarTabela()