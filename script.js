const tarefaForm = document.getElementById('tarefaForm');
const tarefaList = document.getElementById('tarefaList');

tarefaForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const tarefaName = document.getElementById('tarefaName').value;
    const tarefaDescription = document.getElementById('tarefaDescription').value;
    const tarefaTime = document.getElementById('tarefaTime').value;

    addTarefa(tarefaName, tarefaDescription, tarefaTime);

    tarefaForm.reset();
});

function addTarefa(name, description, time) {
    const tarefaItem = document.createElement('li');
    tarefaItem.className = 'tarefa-item';

    tarefaItem.innerHTML = `
        <span>
            <strong>${name}</strong><br>
            ${description}<br>
            <em>${new Date(time).toLocaleString()}</em>
        </span>
        <button onclick="deleteTarefa(this)">Excluir</button>
    `;

    tarefaList.appendChild(tarefaItem);
}

function deleteTarefa(button) {
    const tarefaItem = button.parentElement;
    tarefaList.removeChild(tarefaItem);
}

function editTarefa(button) {
    const tarefaItem = button.parentElement;
    const details = tarefaItem.querySelector('span');
    const [name, description, time] = details.innerHTML.match(/<strong>(.*?)<\/strong>|<em>(.*?)<\/em>|<br>(.*?)<br>/g).map(item => item.replace(/<\/?[^>]+(>|$)/g, '').trim());

    document.getElementById('tarefaName').value = name;
    document.getElementById('tarefaDescription').value = description;
    document.getElementById('tarefaTime').value = new Date(time).toISOString().slice(0, 16);

    tarefaList.removeChild(tarefaItem);
}
