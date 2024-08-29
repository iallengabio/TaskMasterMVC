import { AuthPresenterInterface } from "../../../presenter/authPresenterInterface";
import AppBar from "../components/AppBar";
import ThemeToggleButton from "../components/ActionButtons";
import LoginCard from "../components/LoginCard";

interface LoginPageProps {
  authPresenter: AuthPresenterInterface;
}

const LoginPage: React.FC<LoginPageProps> = ({ authPresenter }) => {
  //console.log(authPresenter);
  return (
    <div>
      <AppBar
        title="Login"
        actions={[<ThemeToggleButton key="theme-toggle" />]}
      />
      
      <main id="loginPage" className="middle-align center-align responsive max">
        <div className="large-space"></div>
        <LoginCard signInAction={authPresenter.signIn.bind(authPresenter)} signInWithGoogleAction={authPresenter.signInWithGoogle.bind(authPresenter)} signUpAction={function (): void {
          throw new Error("Function not implemented.");
        } } />
      </main>
    </div>
  );
};

export default LoginPage;
