import "beercss";
import "material-dynamic-colors";
import { AppView } from "./view/appView";
import { AuthPresenter } from "./presenter/authPresenter";
import { Router } from "./view/util/router";
import { FirebaseAuthService } from "./model/services/firebaseAuthService";
import { LoginView } from "./view/loginView";
import { TaskView } from "./view/taskView";
import { FirebaseTaskService } from "./model/services/firebaseTaskService";
import { TaskPresenter } from "./presenter/taskPresenter";

//Injeção de dependencias
//Model
const authService = new FirebaseAuthService();
const taskService = new FirebaseTaskService();

//Presenter
const authPresenter = new AuthPresenter(authService);
const taskPresenter = new TaskPresenter(authService,taskService);

//View
const router = new Router();
const app = new AppView(authPresenter,router);
const loginView = new LoginView(authPresenter,router);
const taskView = new TaskView(taskPresenter);

//Executando as views
document.addEventListener("DOMContentLoaded", (event) => {
    app.run();
    loginView.run();
    taskView.run();
});
