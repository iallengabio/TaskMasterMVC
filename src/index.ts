import "beercss";
import "material-dynamic-colors";
import { AuthPresenter } from "./presenter/authPresenter";
import { FirebaseAuthService } from "./model/services/firebaseAuthService";
import { FirebaseTaskService } from "./model/services/firebaseTaskService";
import { TaskPresenter } from "./presenter/taskPresenter";
import { WebKitView } from "./view/webKit/webKitView";
import { ViewInterface } from "./view/viewInterface";
import { ReactView } from "./view/react/reactView";

//Injeção de dependencias
//Model
const authService = new FirebaseAuthService();
const taskService = new FirebaseTaskService();

//Presenter
const authPresenter = new AuthPresenter(authService);
const taskPresenter = new TaskPresenter(authService,taskService);

//View
//const view : ViewInterface = new WebKitView(authPresenter,taskPresenter);
const view : ViewInterface = new ReactView(authPresenter,taskPresenter);

//Executando as views
document.addEventListener("DOMContentLoaded", (event) => {
    view.run();
});
