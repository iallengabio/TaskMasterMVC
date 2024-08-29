import { ReactNode } from "react";

interface AppBarProps {
  title: string;
  actions: ReactNode[];
}

const AppBar: React.FC<AppBarProps> = ({ title, actions }) => {
  return (
    <header>
      <nav>
        <h5 className="max">{title}</h5>
        <div>
          {actions.map((action, index) => (
            <span key={index}>{action}</span>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default AppBar;
