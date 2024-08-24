import { User } from "../model/entities/user";

/**
 * AuthPresenterInterface é responsável por gerenciar a lógica de autenticação
 * e comunicar o estado de autenticação para a View.
 */
export interface AuthPresenterInterface {
    /**
     * Tenta criar uma conta de usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    signUp(email: string, password: string): Promise<User|null>;

    /**
     * Tenta fazer login do usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    signIn(email: string, password: string): Promise<User|null>;

    /**
     * Tenta fazer login do usuário com o provedor de autenticação do Google.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    signInWithGoogle(): Promise<User|null>;

    /**
     * Faz logout do usuário.
     * @returns Uma Promise que resolve quando o logout for concluído.
     */
    signOut(): Promise<void>;

    /**
     * Recupera o usuário autenticado atual.
     * @returns O usuário autenticado ou null se não houver usuário autenticado.
     */
    getCurrentUser(): User | null;

    /**
     * Observa alterações no estado do usuário logado.
     * @param callback - Função de retorno de chamada que será chamada com o usuário autenticado ou null quando houver uma alteração.
     */
    observeAuthChanges(callback: (user: User | null) => void): void;
}