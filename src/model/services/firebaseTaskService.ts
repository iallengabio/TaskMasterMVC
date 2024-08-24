
import { Task } from '../entities/task';
import { TaskService } from './taskService';
import { firestore } from './util/firebaseInit';
import {
  collection,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  DocumentReference,
  DocumentData,
  QuerySnapshot,
} from 'firebase/firestore';

/**
 * Implementação do serviço de tarefas usando Firebase Firestore.
 */
export class FirebaseTaskService implements TaskService {
  /**
   * Cria uma nova tarefa para um usuário.
   * @param userId - ID do usuário para quem a tarefa será criada.
   * @param task - Objeto Task contendo as informações da tarefa.
   * @returns Uma Promise que resolve com a tarefa criada.
   */
  async createTask(userId: string, task: Task): Promise<Task> {
    const userTasksRef = collection(firestore, `Users/${userId}/Tasks`);
    const taskRef = await addDoc(userTasksRef, {
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: new Date(),
    });

    const createdTask = { ...task, id: taskRef.path };
    return createdTask;
  }

  /**
   * Atualiza uma tarefa existente.
   * @param taskId - Referência completa do documento da tarefa a ser atualizada.
   * @param updatedTask - Objeto Task contendo as novas informações da tarefa.
   * @returns Uma Promise que resolve com a tarefa atualizada.
   */
  async updateTask(taskId: string, updatedTask: Task): Promise<Task> {
    const taskRef = doc(firestore, taskId);
    await updateDoc(taskRef, {
      title: updatedTask.title,
      description: updatedTask.description,
      completed: updatedTask.completed,
    });

    return updatedTask;
  }

  /**
   * Deleta uma tarefa.
   * @param taskId - Referência completa do documento da tarefa a ser deletada.
   * @returns Uma Promise que resolve quando a tarefa for deletada.
   */
  async deleteTask(taskId: string): Promise<void> {
    const taskRef = doc(firestore, taskId);
    await deleteDoc(taskRef);
  }

  /**
   * Observa as tarefas de um usuário específico.
   * @param userId - ID do usuário cujas tarefas serão observadas.
   * @param callback - Função de retorno de chamada que será chamada com a lista de tarefas.
   * @returns Uma função para cancelar a observação.
   */
  observeTasks(userId: string, callback: (tasks: Task[]) => void): () => void {
    const userTasksRef = collection(firestore, `Users/${userId}/Tasks`);
    const tasksQuery = query(userTasksRef);

    const unsubscribe = onSnapshot(tasksQuery, (querySnapshot: QuerySnapshot<DocumentData>) => {
      const tasks: Task[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        tasks.push({
          id: doc.ref.path, // Armazena a referência completa do documento
          title: data.title,
          description: data.description,
          completed: data.completed,
        });
      });
      callback(tasks);
    });

    return unsubscribe;
  }
}
