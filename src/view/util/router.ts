/**
 * Classe responsável por gerenciar a navegação entre as páginas da aplicação.
 */
export class Router {
    /**
     * Elemento HTML da página de login.
     */
    loginPage: HTMLElement;
    /**
     * Elemento HTML da página de cadastro.
     */
    signUpPage: HTMLElement;
    /**
     * Elemento HTML da página de tarefas.
     */
    taskPage: HTMLElement;

    loadingPage: HTMLElement;

    /**
     * Construtor da classe.
     * Inicializa as propriedades com os elementos HTML correspondentes.
     */
    constructor() {
        this.loginPage = document.getElementById("loginPage")!;
        this.signUpPage = document.getElementById("singUpPage")!;
        this.taskPage = document.getElementById("taskPage")!;
        this.loadingPage = document.getElementById('loadingPage')!;
    }

    /**
     * Exibe a página especificada e oculta as demais.
     * @param page Elemento HTML da página a ser exibida.
     */
    showPage(page: HTMLElement) {
        const pages = [this.loginPage, this.signUpPage, this.taskPage, this.loadingPage];
        pages.forEach(page => page.classList.remove("active"));
        
        if (page) {
            page.classList.add("active");
        }
    }
}

