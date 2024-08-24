import { AuthService } from '../model/services/authService';
import { User } from '../model/entities/user';

/**
 * AuthPresenter é responsável por gerenciar a lógica de autenticação
 * e comunicar o estado de autenticação para a View.
 */
export class AuthPresenter {
    private authService: AuthService;
    private currentUser: User | null = null;

    /**
     * Cria uma instância do AuthPresenter.
     * @param authService - O serviço de autenticação a ser utilizado.
     */
    constructor(authService: AuthService) {
        this.authService = authService;
    }

    /**
     * Tenta criar uma conta de usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    async signUp(email: string, password: string): Promise<User|null> {
        try {
            const user = await this.authService.createUserWithEmailAndPassword(email, password);
            this.currentUser = user;
            return user;
        } catch (error) {
            throw new Error(`Falha ao criar a conta: ${error.message}`);
        }
    }

    /**
     * Tenta fazer login do usuário com e-mail e senha.
     * @param email - Endereço de e-mail do usuário.
     * @param password - Senha do usuário.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    async signIn(email: string, password: string): Promise<User|null> {
        try {
            const user = await this.authService.signInWithEmailAndPassword(email, password);
            this.currentUser = user;
            return user;
        } catch (error) {
            throw new Error(`Falha ao fazer login: ${error.message}`);
        }
    }

    /**
     * Tenta fazer login do usuário com o provedor de autenticação do Google.
     * @returns Uma Promise que resolve com o usuário autenticado ou rejeita com um erro.
     */
    async signInWithGoogle(): Promise<User|null> {
        try {
            const user = await this.authService.signInWithGoogle();
            this.currentUser = user;
            return user;
        } catch (error) {
            throw new Error(`Falha ao fazer login com o Google: ${error.message}`);
        }
    }

    /**
     * Faz logout do usuário.
     * @returns Uma Promise que resolve quando o logout for concluído.
     */
    async signOut(): Promise<void> {
        try {
            await this.authService.signOut();
            this.currentUser = null;
        } catch (error) {
            throw new Error(`Falha ao fazer logout: ${error.message}`);
        }
    }

    /**
     * Recupera o usuário autenticado atual.
     * @returns O usuário autenticado ou null se não houver usuário autenticado.
     */
    getCurrentUser(): User | null {
        return this.currentUser;
    }

    /**
     * Observa alterações no estado do usuário logado.
     * @param callback - Função de retorno de chamada que será chamada com o usuário autenticado ou null quando houver uma alteração.
     */
    observeAuthChanges(callback: (user: User | null) => void): void {
        this.authService.onAuthStateChanged((user) => {
            this.currentUser = user;
            callback(user);
        });
    }
}
