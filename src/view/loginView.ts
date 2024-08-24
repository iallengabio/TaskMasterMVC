import { AuthPresenterInterface } from "../presenter/authPresenterInterface";
import { Router } from "./util/router";

/**
 * Class responsible for managing the login view.
 */
export class LoginView{
    authPresenter : AuthPresenterInterface;
    router : Router;
    emailInput : HTMLInputElement;
    passwordInput : HTMLInputElement;
    loginButton : HTMLButtonElement;
    signUpButton : HTMLButtonElement;
    logoutButton : HTMLButtonElement;


    /**
     * Creates an instance of LoginView.
     * @param authPresenter - The presenter responsible for authentication logic.
     * @param router - The router used for navigation.
     */
    constructor(authPresenter : AuthPresenterInterface, router : Router){
        this.authPresenter = authPresenter;
        this.router = router;
        this.emailInput = document.getElementById("emailInput") as HTMLInputElement;
        this.passwordInput = document.getElementById("passwordInput") as HTMLInputElement;
        this.loginButton = document.getElementById("loginButton") as HTMLButtonElement;
        this.signUpButton = document.getElementById("signUpButton") as HTMLButtonElement;
        this.logoutButton = document.getElementById("logoutButton") as HTMLButtonElement;
    }

    /**
     * Initializes the login view by attaching event listeners to buttons.
     */
    run(){
        this.logoutButton.addEventListener('click', async ()=>{
            this.router.showPage(this.router.loadingPage);
            await this.authPresenter.signOut();
            
        });

        this.loginButton.addEventListener("click", async () => {
            const email = this.emailInput.value;
            const password = this.passwordInput.value;
            this.waitLogin();
            await this.authPresenter.signIn(email,password).then(() => {
                //this.router.showPage(this.router.taskPage);\
                console.log('login feito com sucesso.');
            }).catch((error) => {
                console.log('login não foi possível');
                console.log(error);
            });
            this.resetLoginForm();
        });

        this.signUpButton.addEventListener("click", () => {
            this.router.showPage(this.router.signUpPage);
        });

        this.authPresenter.observeAuthChanges((user)=>{
            if(user){
                console.log('active');
                this.logoutButton.classList.add('active');
            } 
            else {
                console.log('deactive');
                this.logoutButton.classList.remove('active');
            }
        });
    }

    /**
     * Disables login form controls while login is in progress.
     */
    private waitLogin(){
        this.loginButton.disabled = true;
        this.emailInput.disabled = true;
        this.passwordInput.disabled = true;
        this.signUpButton.disabled = true;
    }

    /**
     * Resets the login form to its initial state.
     */
    private resetLoginForm(){
        this.loginButton.disabled = false;
        this.signUpButton.disabled = false;
        this.emailInput.disabled = false;
        this.emailInput.value = '';
        this.passwordInput.disabled = false;
        this.passwordInput.value = '';
    }
}
