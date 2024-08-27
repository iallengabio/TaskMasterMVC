import { Task } from "../model/entities/task";

/**
 * A interface `TaskPresenterInterface` define os métodos necessários para gerenciar
 * as operações de criação, atualização, exclusão e observação de tarefas.
 * 
 * Esta interface deve ser implementada pelo presenter que irá mediar a comunicação
 * entre a camada de View e a camada de Model, garantindo que as operações relacionadas
 * às tarefas sejam executadas e que as mudanças sejam refletidas na interface do usuário.
 */
export interface TaskPresenterInterface {

    /**
     * Cria uma nova tarefa com o título e a descrição fornecidos.
     * 
     * @param titulo - O título da nova tarefa.
     * @param descricao - A descrição da nova tarefa.
     * @returns Uma `Promise` que resolve quando a tarefa for criada.
     * 
     * Este método é responsável por adicionar uma nova tarefa ao repositório
     * de tarefas, garantindo que ela seja armazenada e que a interface do
     * usuário seja atualizada para refletir a nova tarefa.
     */
    createTask(titulo: string, descricao: string): Promise<void>;

    /**
     * Exclui uma tarefa existente.
     * 
     * @param task - A instância da tarefa a ser excluída.
     * 
     * Este método remove a tarefa especificada do repositório, eliminando-a
     * permanentemente e atualizando a interface para remover a tarefa da lista.
     */
    deleteTask(task: Task): void;

    /**
     * Marca uma tarefa como concluída ou não concluída.
     * 
     * @param task - A instância da tarefa a ser marcada como concluída ou não.
     * 
     * Este método alterna o estado de conclusão de uma tarefa. Se a tarefa estiver
     * marcada como concluída, ela será marcada como não concluída, e vice-versa.
     * A interface do usuário será atualizada para refletir essa mudança.
     */
    setTaskDone(task: Task): void;

    /**
     * Observa as mudanças na lista de tarefas e executa um callback quando ocorrerem alterações.
     * 
     * @param callback - Função a ser executada sempre que a lista de tarefas for atualizada.
     *                   O callback recebe um array de tarefas atualizadas.
     * @returns Uma função de cancelamento que, quando chamada, para de observar as mudanças.
     * 
     * Este método permite que a interface do usuário se mantenha sincronizada com as
     * mudanças na lista de tarefas, chamando o callback fornecido sempre que ocorrerem
     * alterações. Ele também retorna uma função que pode ser usada para interromper a observação.
     */
    observeTasks(callback: (tasks: Task[]) => void): () => void;
}
