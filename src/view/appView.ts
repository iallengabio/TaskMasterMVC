import ui from "beercss";
import { AuthPresenterInterface } from "../presenter/authPresenterInterface";
import { Router } from "./util/router";

/**
 * The main view class for the application.
 * 
 * This class is responsible for handling user interface interactions
 * and updating the view based on changes in the application state.
 */
export class AppView {
    /**
     * The presenter responsible for handling authentication logic.
     */
    authPresenter: AuthPresenterInterface;
    
    /**
     * The router used to navigate between different pages in the application.
     */
    router: Router;
    
    /**
     * The button element used to toggle the theme mode.
     */
    modeThemeButton: HTMLElement;

    


    /**
     * Creates a new instance of the AppView class.
     * @param authPresenter The presenter responsible for handling authentication logic.
     * @param router The router used to navigate between pages.
     */
    constructor(authPresenter: AuthPresenterInterface, router: Router) {
        this.authPresenter = authPresenter;
        this.router = router;
        this.modeThemeButton = document.getElementById("modeThemeButton")!;
    }

    /**
     * Initializes the view and starts listening for events.
     */
    run() {
        this.authPresenter.observeAuthChanges((user) => {
            if (user) {
                //console.log("Usuário autenticado:", user);
                this.router.showPage(this.router.taskPage);
            } else {
                this.router.showPage(this.router.loginPage);
            }
        });

        this.modeThemeButton.addEventListener("click", () => {
            this.changeModeTheme();
        });
    }

    /**
     * Changes the application's theme mode between light and dark.
     */
    changeModeTheme() {
        let newMode = ui("mode") == "dark" ? "light" : "dark";
        ui("mode", newMode);
        let themeIcon = this.modeThemeButton.querySelector("i")!;
        themeIcon.innerHTML = newMode + '_mode';
    }
}
