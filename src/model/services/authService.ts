import { User } from "../entities/user";

/**
 * Interface para o serviço de autenticação.
 */
export interface AuthService {
    /**
     * Cria uma conta de usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o resultado da criação da conta.
     */
    createUserWithEmailAndPassword(email: string, password: string): Promise<User | null>;
  
    /**
     * Faz login do usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o resultado do login.
     */
    signInWithEmailAndPassword(email: string, password: string): Promise<User | null>;
  
    /**
     * Faz login do usuário com o provedor de autenticação do Google.
     * @returns Uma Promise que resolve com o resultado do login.
     */
    signInWithGoogle(): Promise<User | null>;
  
    /**
     * Faz logout do usuário.
     * @returns Uma Promise que resolve quando o logout é concluído.
     */
    signOut(): Promise<void>;
  
    /**
     * Recupera o usuário autenticado atual.
     * @returns O usuário autenticado ou null se não houver usuário autenticado.
     */
    getCurrentUser(): Promise<User | null>;
  
    /**
     * Observa alterações no estado do usuário logado.
     * @param callback - Função de retorno de chamada que será chamada com o usuário autenticado ou null quando houver uma alteração.
     * @returns Uma função para cancelar a observação.
     */
    onAuthStateChanged(callback: (user: User | null) => void): () => void;
  }
  