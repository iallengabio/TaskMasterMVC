import React, { useEffect, useState } from 'react';
import { AuthPresenterInterface } from '../../presenter/authPresenterInterface';
import { TaskPresenterInterface } from '../../presenter/taskPresenterInterface';
import LoginPage from './pages/LoginPage';


interface AppProps {
    authPresenter: AuthPresenterInterface;
    taskPresenter: TaskPresenterInterface;
}

export const App: React.FC<AppProps> = ({ authPresenter, taskPresenter }) => {
    const [currentUser, setCurrentUser] = useState(authPresenter.getCurrentUser());
    //console.log(authPresenter);

    useEffect(() => {
        const unsubscribe = authPresenter.observeAuthChanges(setCurrentUser);
        return () => {};
    }, [authPresenter]);

    return currentUser ? (
        <h1>logado</h1>
        //<TaskView taskPresenter={taskPresenter} />
    ) : (
        <LoginPage authPresenter={authPresenter}/>
        //<AuthView authPresenter={authPresenter} />
    );
};
