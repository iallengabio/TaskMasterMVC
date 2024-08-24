import "beercss";
import "material-dynamic-colors";
import { AppView } from "./view/appView";
import { AuthPresenter } from "./presenter/authPresenter";
import { Router } from "./view/util/router";
import { FirebaseAuthService } from "./model/services/firebaseAuthService";
import { LoginView } from "./view/loginView";

//Injeção de dependencias
//Model
const authService = new FirebaseAuthService();

//Presenter
const authPresenter = new AuthPresenter(authService);

//View
const router = new Router();
const app = new AppView(authPresenter,router);
const loginView = new LoginView(authPresenter,router);

//Executando as views
app.run();
loginView.run();