/**
 * Representa uma tarefa no sistema.
 */
export class Task {
    /**
     * Identificador único da tarefa.
     */
    id: string;
  
    /**
     * Título da tarefa.
     */
    title: string;
  
    /**
     * Descrição detalhada da tarefa.
     */
    description: string;
  
    /**
     * Estado da tarefa (se está concluída ou não).
     */
    completed: boolean;
  
    /**
     * Cria uma nova instância de Task.
     * @param id - Identificador único da tarefa.
     * @param title - Título da tarefa.
     * @param description - Descrição detalhada da tarefa.
     * @param completed - Estado da tarefa (opcional, padrão é false).
     */
    constructor(id: string, title: string, description: string, completed: boolean = false) {
      this.id = id;
      this.title = title;
      this.description = description;
      this.completed = completed;
    }
  }
  