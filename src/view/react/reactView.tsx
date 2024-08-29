import ReactDOM from "react-dom/client";
import { ViewInterface } from "../viewInterface";
import { AuthPresenterInterface } from "../../presenter/authPresenterInterface";
import { TaskPresenterInterface } from "../../presenter/taskPresenterInterface";
import { App } from "./App";


export class ReactView implements ViewInterface{
    
    authPresenter: AuthPresenterInterface;
    taskPresenter: TaskPresenterInterface;

    constructor(authPresenter: AuthPresenterInterface, taskPresenter: TaskPresenterInterface){
        this.authPresenter = authPresenter;
        this.taskPresenter = taskPresenter;
    }
    
    run(): void {
        const root = document.createElement('div');
        root.id = 'root';
        document.body.innerHTML = '';
        document.body.append(root);

        const rootRD = ReactDOM.createRoot(document.getElementById("root")!);
        rootRD.render(<App authPresenter={this.authPresenter} taskPresenter={this.taskPresenter} />);
    }
}
