/**
 * Representa um usuário no sistema.
 */
export class User {
    /**
     * Identificador único do usuário.
     */
    id: string;
  
    /**
     * Nome completo do usuário.
     */
    name?: string;
  
    /**
     * Endereço de e-mail do usuário.
     */
    email: string;
  
    /**
     * URL da imagem de perfil do usuário (pode ser undefined).
     */
    imgUrl?: string;
  
    /**
     * Cria uma nova instância de User.
     * @param id - Identificador único do usuário.
     * @param name - Nome completo do usuário.
     * @param email - Endereço de e-mail do usuário.
     * @param imgUrl - URL da imagem de perfil do usuário (opcional).
     */
    constructor(id: string, email: string, name?: string, imgUrl?: string) {
      this.id = id;
      this.name = name;
      this.email = email;
      this.imgUrl = imgUrl;
    }
  }
  