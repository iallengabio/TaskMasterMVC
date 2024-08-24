// src/model/services/firebaseAuthService.ts

import { AuthService } from './authService';
import { User } from '../entities/user';
import { 
  User as FirebaseUser, 
  signInWithEmailAndPassword as firebaseSignInWithEmailAndPassword, 
  createUserWithEmailAndPassword as firebaseCreateUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  UserCredential
} from 'firebase/auth';
import { auth } from './util/firebaseInit';

/**
 * Implementação do serviço de autenticação usando Firebase.
 */
export class FirebaseAuthService implements AuthService {
  private auth = auth;

  /**
   * Cria uma nova instância de FirebaseAuthService.
   */
  constructor() {}

  /**
   * Cria uma conta de usuário com e-mail e senha.
   * @param email - Endereço de e-mail do usuário.
   * @param password - Senha do usuário.
   * @returns Uma Promise que resolve com o usuário criado.
   */
  async createUserWithEmailAndPassword(email: string, password: string): Promise<User|null> {
    const userCredential: UserCredential = await firebaseCreateUserWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  /**
   * Faz login do usuário com e-mail e senha.
   * @param email - Endereço de e-mail do usuário.
   * @param password - Senha do usuário.
   * @returns Uma Promise que resolve com o usuário autenticado.
   */
  async signInWithEmailAndPassword(email: string, password: string): Promise<User|null> {
    const userCredential: UserCredential = await firebaseSignInWithEmailAndPassword(this.auth, email, password);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  /**
   * Faz login do usuário com o provedor de autenticação do Google.
   * @returns Uma Promise que resolve com o usuário autenticado.
   */
  async signInWithGoogle(): Promise<User|null> {
    const provider = new GoogleAuthProvider();
    const userCredential: UserCredential = await signInWithPopup(this.auth, provider);
    const firebaseUser = userCredential.user;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  /**
   * Faz logout do usuário.
   * @returns Uma Promise que resolve quando o logout é concluído.
   */
  async signOut(): Promise<void> {
    await firebaseSignOut(this.auth);
  }

  /**
   * Recupera o usuário autenticado atual.
   * @returns O usuário autenticado ou null se não houver usuário autenticado.
   */
  async getCurrentUser(): Promise<User | null> {
    const firebaseUser = this.auth.currentUser;
    return this.mapFirebaseUserToUser(firebaseUser);
  }

  /**
   * Observa alterações no estado do usuário logado.
   * @param callback - Função de retorno de chamada que será chamada com o usuário autenticado ou null quando houver uma alteração.
   * @returns Uma função para cancelar a observação.
   */
  onAuthStateChanged(callback: (user: User | null) => void): () => void {
    return firebaseOnAuthStateChanged(this.auth, async (firebaseUser) => {
      const user = await this.mapFirebaseUserToUser(firebaseUser);
      callback(user);
    });
  }

  /**
   * Mapeia um usuário do Firebase para a entidade User.
   * @param firebaseUser - Usuário do Firebase.
   * @returns A instância de User.
   */
  private async mapFirebaseUserToUser(firebaseUser: FirebaseUser | null): Promise<User | null> {
    if (firebaseUser) {
      return new User(
        firebaseUser.uid,
        firebaseUser.email ?? '',
        firebaseUser.displayName??undefined,
        firebaseUser.photoURL??undefined
      );
    }
    return null;
  }
}
