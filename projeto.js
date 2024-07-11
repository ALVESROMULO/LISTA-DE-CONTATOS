const formulario = document.querySelector("#formAdicionarContato");
const nome = document.querySelector("#nome");
const numero = document.querySelector("#numero");
const email = document.querySelector("#email");
const contatos = document.querySelector("#contatos");

let editandoContatoIndex = null; 
function obterContatosSalvos() {
    const contatosSalvos = localStorage.getItem("contatos");
    return contatosSalvos ? JSON.parse(contatosSalvos) : [];
}

function salvarContato(contato) {
    const contatosSalvos = obterContatosSalvos();
    if (editandoContatoIndex !== null) {
        contatosSalvos[editandoContatoIndex] = contato;
        editandoContatoIndex = null;
    } else {
        contatosSalvos.push(contato);
    }
    localStorage.setItem("contatos", JSON.stringify(contatosSalvos));
}

function exibirContatos() {
    const contatosSalvos = obterContatosSalvos();
    contatos.innerHTML = "";
    contatosSalvos.forEach((contato, index) => {
        const card = document.createElement("div");
        card.classList.add("contato-card"); 

        card.innerHTML = `
            <h2> Nome: ${contato.nome} </h2>
            <p> Número: ${contato.numero} </p>
            <p> E-mail: ${contato.email} </p>
            <button class="editar-contato" data-index="${index}">Editar</button>
            <button class="excluir-contato" data-index="${index}">Excluir</button>
        `;

        contatos.appendChild(card);

        const editarBtn = card.querySelector(".editar-contato");
        const excluirBtn = card.querySelector(".excluir-contato");

        editarBtn.addEventListener("click", () => editarContato(index));
        excluirBtn.addEventListener("click", () => excluirContato(index));
    });
}

function editarContato(index) {
    const contatosSalvos = obterContatosSalvos();
    const contatoParaEditar = contatosSalvos[index];

    
    nome.value = contatoParaEditar.nome;
    numero.value = contatoParaEditar.numero;
    email.value = contatoParaEditar.email;

    editandoContatoIndex = index;

   
    contatosSalvos.splice(index, 1);
    localStorage.setItem("contatos", JSON.stringify(contatosSalvos));

    exibirContatos();
}

function excluirContato(index) {
    const contatosSalvos = obterContatosSalvos();
    contatosSalvos.splice(index, 1);
    localStorage.setItem("contatos", JSON.stringify(contatosSalvos));


    exibirContatos();
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();

    const novoContato = {
        nome: nome.value,
        numero: numero.value,
        email: email.value
    };

    salvarContato(novoContato);

    nome.value = "";
    numero.value = "";
    email.value = "";

    exibirContatos();
});

document.addEventListener("DOMContentLoaded", () => {
    exibirContatos();
});
