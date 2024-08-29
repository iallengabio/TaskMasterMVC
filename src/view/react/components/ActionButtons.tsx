import { useState } from "react";

// Definindo o tipo das props para ActionButton
interface ActionButtonProps {
  icon: string;
  onClick: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ icon, onClick }) => {
  return (
    <button
      className="circle transparent"
      onClick={onClick}
      aria-label="Toggle theme"
    >
      <i>{icon}</i>
    </button>
  );
};

const ThemeToggleButton: React.FC = () => {
  // Estado para armazenar o tema atual
  const [mode, setMode] = useState(ui("mode") as string);

  // Função para alternar entre os modos de tema
  const toggleTheme = () => {
    const newMode = mode === "light" ? "dark" : "light";
    ui("mode", newMode); // Altera o tema
    setMode(newMode); // Atualiza o estado do tema
  };

  // Escolhe o ícone com base no tema atual
  const icon = mode === "light" ? "dark_mode" : "light_mode";

  return <ActionButton icon={icon} onClick={toggleTheme} />;
};

export default ThemeToggleButton;
