import { AuthPresenterInterface } from "../../presenter/authPresenterInterface";
import { TaskPresenterInterface } from "../../presenter/taskPresenterInterface";
import { AppView } from "./appView";
import { LoginView } from "./loginView";
import { TaskView } from "./taskView";
import { ViewInterface } from "../viewInterface";
import { Router } from "./util/router";

export class WebKitView implements ViewInterface{

    router : Router;
    appView : AppView;
    loginView : LoginView;
    taskView : TaskView;

    constructor(authPresenter:AuthPresenterInterface, taskPresenter:TaskPresenterInterface){
        this.router = new Router();
        this.appView = new AppView(authPresenter,this.router);
        this.loginView = new LoginView(authPresenter,this.router);
        this.taskView = new TaskView(taskPresenter);
    }

    run(): void {
        this.appView.run();
        this.loginView.run();
        this.taskView.run();
    }

}