import { Task } from "../model/entities/task";
import { TaskPresenterInterface } from "../presenter/taskPresenterInterface";

export class TaskView {
    uncompletedTasksContainer: HTMLElement;
    completedTasksContainer: HTMLElement;
    dialogContainer: HTMLElement;
    taskPresenter: TaskPresenterInterface; // Referência ao TaskPresenter

    constructor(taskPresenter: TaskPresenterInterface) {
        
        this.taskPresenter = taskPresenter;
        this.dialogContainer = document.getElementById('dialogContainer')!;
        this.uncompletedTasksContainer = document.getElementById('uncompleted-tasks-container')!;
        this.completedTasksContainer = document.getElementById('completed-tasks-container')!;
    }

    run(){
        
        // Adiciona o evento ao botão "add-task"
        document.getElementById('add-task')?.addEventListener('click', () => this.showAddTaskDialog());
        this.taskPresenter.observeTasks(this.populateTasks.bind(this));

    }

    private populateTasks(tasks: Task[]) {
        //console.log('populate Tasks');
        this.uncompletedTasksContainer.innerHTML = '';
        this.completedTasksContainer.innerHTML = '';
    
        tasks.forEach(task => {
            const taskElement = document.createElement('article');
            taskElement.classList.add('round');
    
            // Cria a estrutura da tarefa usando createElement
            const rowDiv = document.createElement('div');
            rowDiv.classList.add('row');
    
            const maxDiv = document.createElement('div');
            maxDiv.classList.add('max');
    
            const titleElement = document.createElement('h5');
            titleElement.textContent = task.title;
    
            const descriptionElement = document.createElement('p');
            descriptionElement.textContent = task.description;
    
            maxDiv.appendChild(titleElement);
            maxDiv.appendChild(descriptionElement);
            rowDiv.appendChild(maxDiv);
            taskElement.appendChild(rowDiv);
    
            const navElement = document.createElement('nav');
            navElement.classList.add('right-align');
    
            const deleteButton = document.createElement('button');
            deleteButton.classList.add('error-container');
            deleteButton.innerHTML = `<i>delete</i><span>Remover</span>`;
            deleteButton.addEventListener('click', () => this.taskPresenter.deleteTask(task));
    
            const actionButton = document.createElement('button');
            actionButton.innerHTML = `<i>${task.completed ? 'undo' : 'check'}</i><span>${task.completed ? 'Refazer' : 'Concluir'}</span>`;
            actionButton.addEventListener('click', () => this.taskPresenter.setTaskDone(task));
    
            navElement.appendChild(deleteButton);
            navElement.appendChild(actionButton);
            taskElement.appendChild(navElement);
    
            // Adiciona a tarefa no contêiner correto
            if (task.completed) {
                this.completedTasksContainer.appendChild(taskElement);
            } else {
                this.uncompletedTasksContainer.appendChild(taskElement);
            }
        });
    }
    

    private showAddTaskDialog() {
        this.dialogContainer.innerHTML = `
            <div class="overlay active"></div>
            <dialog class="active large-width" id="dialog-add-task">
              <h5>Nova Tarefa</h5>
              <div class="field border round label">
                <input type="text" id="input-titulo" />
                <label>Título</label>
                <span class="helper">Título da nova tarefa</span>
              </div>
              <div class="field textarea label border round">
                <textarea id="input-descricao"></textarea>
                <label>Descrição</label>
                <span class="helper">Descrição da nova tarefa</span>
              </div>
              <nav class="right-align">
                <button class="tertiary" id="button-cancelar-resposta">
                  <i>undo</i><span>Cancelar</span>
                </button>
                <button id="button-confirmar-resposta">
                  <i>add</i><span>Confirmar</span>
                </button>
              </nav>
            </dialog>
        `;

        // Adiciona os eventos para os botões "Cancelar" e "Confirmar"
        document.getElementById('button-cancelar-resposta')?.addEventListener('click', () => this.cancelTaskDialog());
        document.getElementById('button-confirmar-resposta')?.addEventListener('click', () => this.confirmTaskDialog());
    }

    private cancelTaskDialog() {
        this.dialogContainer.innerHTML = ''; // Remove o diálogo, fechando-o
    }

    private async confirmTaskDialog() {
        const titulo = (document.getElementById('input-titulo') as HTMLInputElement).value;
        const descricao = (document.getElementById('input-descricao') as HTMLTextAreaElement).value;

        if (titulo && descricao) {
            await this.taskPresenter.createTask(titulo, descricao); // Chama o método do TaskPresenter para criar a tarefa
            this.dialogContainer.innerHTML = ''; // Fecha o diálogo após confirmar
        } else {
            // Lógica adicional para lidar com inputs inválidos (opcional)
        }
    }
}
