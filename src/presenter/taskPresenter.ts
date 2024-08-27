import { Task } from "../model/entities/task";
import { AuthService } from "../model/services/authService";
import { TaskService } from "../model/services/taskService";
import { TaskPresenterInterface } from "./taskPresenterInterface";

export class TaskPresenter implements TaskPresenterInterface {
    authService: AuthService;
    taskService: TaskService;
    unsubscribeTasks : ()=>void = ()=>{};

    constructor(authService: AuthService, taskService: TaskService) {
        this.authService = authService;
        this.taskService = taskService;
    }

    async createTask(titulo: string, descricao: string): Promise<void> {
        const currentUser = await this.authService.getCurrentUser();
        if (currentUser) {
            const task = new Task('',titulo, descricao,false);
            await this.taskService.createTask(currentUser.id, task);
        } else {
            throw new Error("Usuário não autenticado.");
        }
    }

    async deleteTask(task: Task): Promise<void> {
        if (!task.id) {
            throw new Error("A tarefa deve ter um ID válido.");
        }
        await this.taskService.deleteTask(task.id);
    }

    async setTaskDone(task: Task): Promise<void> {
        if (!task.id) {
            throw new Error("A tarefa deve ter um ID válido.");
        }
        task.completed = !task.completed;
        await this.taskService.updateTask(task.id, task);
    }

    observeTasks(callback: (tasks: Task[]) => void): () => void {

        const unsubsAuthTasks = this.authService.onAuthStateChanged(async (user) => {
            this.unsubscribeTasks();
            if (user) {
                this.unsubscribeTasks = this.taskService.observeTasks(user.id, callback);
            } else {
                callback([]); // Retorna uma lista vazia se não houver usuário autenticado
                this.unsubscribeTasks = ()=>{};
            }
        });
        
        return ()=>{
            unsubsAuthTasks();
            this.unsubscribeTasks();
        };
    }
}
