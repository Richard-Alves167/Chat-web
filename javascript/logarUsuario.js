let usuarios = []

const armazenamentoUsuarios = localStorage.getItem("usuariosCadastradosLocal")

if (armazenamentoUsuarios !== null) {
    usuarios = JSON.parse(armazenamentoUsuarios)
}

const nome = document.getElementById("nomeLogin")
const senha = document.getElementById("senhaLogin")

function logarUsuario() {
    const nomeColocado = nome.value
    const senhaColocada = senha.value
    const verificar = usuarios.filter((element) => {
        if(nomeColocado == element.nome && senhaColocada == element.senha) {
            return element
        }
    })

    if (verificar[0] != null) {
        window.location = `paginaPerfil.html?id=${verificar[0].id}`
    }
}

nome.addEventListener("keydown",logarUsuario)
senha.addEventListener("keydown",logarUsuario)