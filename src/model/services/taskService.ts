
import { Task } from '../entities/task';

/**
 * Interface para o serviço de tarefas.
 */
export interface TaskService {
  /**
   * Cria uma nova tarefa para um usuário.
   * @param userId - ID do usuário para quem a tarefa será criada.
   * @param task - Objeto Task contendo as informações da tarefa.
   * @returns Uma Promise que resolve com a tarefa criada.
   */
  createTask(userId: string, task: Task): Promise<Task>;

  /**
   * Atualiza uma tarefa existente.
   * @param taskId - ID da tarefa a ser atualizada.
   * @param updatedTask - Objeto Task contendo as novas informações da tarefa.
   * @returns Uma Promise que resolve com a tarefa atualizada.
   */
  updateTask(taskId: string, updatedTask: Task): Promise<Task>;

  /**
   * Deleta uma tarefa.
   * @param taskId - ID da tarefa a ser deletada.
   * @returns Uma Promise que resolve quando a tarefa for deletada.
   */
  deleteTask(taskId: string): Promise<void>;

  /**
   * Observa as tarefas de um usuário específico.
   * @param userId - ID do usuário cujas tarefas serão observadas.
   * @param callback - Função de retorno de chamada que será chamada com a lista de tarefas.
   * @returns Uma função para cancelar a observação.
   */
  observeTasks(userId: string, callback: (tasks: Task[]) => void): () => void;
}
