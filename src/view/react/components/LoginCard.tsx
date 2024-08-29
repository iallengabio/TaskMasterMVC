import React, { useState } from "react";
import { User } from "../../../model/entities/user";

interface LoginCardProps {
  signInAction: (email: string, password: string) => Promise<User | null>;
  signInWithGoogleAction: () => Promise<User | null>;
  signUpAction: () => void;
}

const LoginCard: React.FC<LoginCardProps> = ({
  signInAction,
  signInWithGoogleAction,
  signUpAction,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInAction(email, password);
      // Redirecione ou atualize a UI conforme necessário após o login
    } catch (err) {
      setError("Erro ao fazer login. Verifique seu email e senha.");
      //console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogleAction();
      // Redirecione ou atualize a UI conforme necessário após o login com Google
    } catch (err) {
      setError("Erro ao fazer login com Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <article className="border round surface-bright large-padding s12 m10 l8 grid">
      <div className="left-align s12 m6">
        <i>login</i>
        <h2>Fazer login</h2>
        <p>Entre com seu email e senha ou com a sua conta do Google.</p>
        <p>
          Ou{" "}
          <a
            className="underline primary-text"
            href="#"
            onClick={handleGoogleSignIn}
          >
            clique aqui
          </a>{" "}
          para fazer login com o Google
        </p>
        {error && <p className="error-text">{error}</p>}
      </div>
      <div className="s12 m6">
        <div className="large-space"></div>
        <div className="field label border">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <label>Email</label>
        </div>
        <div className="field label border">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <label>Senha</label>
        </div>
        <div className="space"></div>
        <nav className="right-align">
          <button className="border" onClick={signUpAction} disabled={loading}>
            Criar conta
          </button>
          <button className="" onClick={handleSignIn} disabled={loading}>
            {loading ? "Carregando..." : "Avançar"}
          </button>
        </nav>
      </div>
    </article>
  );
};

export default LoginCard;
