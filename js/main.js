let input = document.querySelector('input[name=tarefa]');

let button = document.querySelector('#botao');

let lista = document.querySelector('#lista');

let tarefas = JSON.parse(localStorage.getItem('tarefas')) || [];

function renderizaTela()
{

    lista.innerHTML = '';

    for(tarefa of tarefas)
    {
        let li = document.createElement('li');

        li.setAttribute('class', 'list-group-item list-group-item-action');

        li.addEventListener('click', function(){
            removeTarefa(this);
        });

        let textTarefa = document.createTextNode(tarefa);

        li.appendChild(textTarefa);

        lista.appendChild(li);
    }
}

renderizaTela();

button.addEventListener('click', function (){

    lista.innerHTML = '';
    
    let itemLista = input.value;

    if(itemLista == '')
    {
        let span = document.createElement('span');

        span.setAttribute('class', 'alert alert-warning');

        let msg = document.createTextNode('Você precisa preencher o nome da tarefa primeiro.');

        span.appendChild(msg);

        document.querySelector('#card').appendChild(span);

        renderizaTela();
    }
    else
    {
        input.value = '';

        tarefas.push(itemLista);

        saveLocalStorage();

        renderizaTela();

        removeSpan();
    }
});

function removeSpan()
{
    let span = document.querySelectorAll('span');

    for (let index = 0; index < span.length; index++)
    {
        document.querySelector('#card').removeChild(span[index]);
    }
}

function removeTarefa(tarefa)
{
    tarefas.splice(tarefas.indexOf(tarefa.textContent), 1);

    saveLocalStorage();
    
    renderizaTela();
}

function saveLocalStorage()
{
    localStorage.setItem('tarefas', JSON.stringify(tarefas));
}