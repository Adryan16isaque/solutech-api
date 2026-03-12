const btnBuscarPost = document.querySelector('#btnBuscarPost');
const btnBuscarTodos = document.querySelector('#btnBuscarTodos');
const btnCriarPost = document.querySelector('#btnCriarPost');
const btnAtualizarPost = document.querySelector('#btnAtualizarPost');

const btnDeletarPost = document.querySelector('#btnDeletarPost');



const resultado = document.querySelector('#resultado');
const inputId = document.querySelector('#idPost');
const titulo = document.querySelector('#titulo');
const conteudo = document.querySelector('#conteudo');
const novoId = document.querySelector('#novoId');
const novoTitulo = document.querySelector('#novoTitulo');

const buscarId = document.querySelector('#buscarId');


btnBuscarPost.addEventListener('click', () => buscarPost())
btnBuscarTodos.addEventListener('click', () => buscarTodosPosts())
btnCriarPost.addEventListener('click', () => criarPost())
btnAtualizarPost.addEventListener('click', () => atualizarPost())
btnDeletarPost.addEventListener('click', () => deletarPost())

function buscarPost() {
    limparResultado()
    const valorId = inputId.value;
    fetch(`https://jsonplaceholder.typicode.com/posts/${valorId}`)
        .then((response) => response.json())
        .then((json) =>
            exibir(json)
        )
}

function buscarTodosPosts() {
    limparResultado()
    fetch(`https://jsonplaceholder.typicode.com/posts/`)
        .then((response) => response.json())
        .then((json) => {
            let resultadofinal = '';
            for (let i = 0; i < 10; i++) {

                resultadofinal += resultado.innerHTML = `${json[i].title} <br>`;

            }
            resultado.innerHTML = `${resultadofinal}`
        })
}

function criarPost() {
    limparResultado()
    const valorTitulo = titulo.value;
    const valorconteudo = conteudo.value;

    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
            title: `${valorTitulo}`,
            body: `${valorconteudo}`,
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) =>
            exibir(json)
        );
}

function atualizarPost() {
    limparResultado()
    const valorNovoId = novoId.value;
    const valorNovoTitulo = novoTitulo.value;

    fetch(`https://jsonplaceholder.typicode.com/posts/${valorNovoId}`, {
        method: 'PUT',
        body: JSON.stringify({

            id: valorNovoId,
            title: `${valorNovoTitulo}`,
            body: 'bar',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    })
        .then((response) => response.json())
        .then((json) => exibir(json));
}

function deletarPost() {
    limparResultado()
    const valorId = buscarId.value
    fetch(`https://jsonplaceholder.typicode.com/posts/${valorId}`, {
        method: 'DELETE'
    })
        .then((response) => resultado.innerHTML = ` ${response.status}`)
}

function limparResultado() {
    resultado.innerHTML = ``
}

function exibir(json) {
    resultado.innerHTML = `
            
            {   "userId": ${json.userId},<br><br>
                "id": ${json.id},<br><br>
                "title": "${json.title}",<br><br>
                "body": "${json.body}"}<br>
            
            `
}