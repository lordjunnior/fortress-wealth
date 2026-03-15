import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
      title={theme === "dark" ? "Modo Pergaminho" : "Modo Noturno"}
      className="fixed top-2 right-4 z-[10000] w-10 h-10 rounded-sm bg-card/90 backdrop-blur-md border border-border flex items-center justify-center text-muted-foreground hover:text-primary transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_12px_hsl(var(--gold)/0.2)]"
    >
      {theme === "dark" ? (
        <Sun className="w-[18px] h-[18px]" />
      ) : (
        <Moon className="w-[18px] h-[18px]" />
      )}
    </button>
  );
};

export default ThemeToggle;
