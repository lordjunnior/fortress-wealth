import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Alternar tema"
      className="fixed top-2 right-4 z-[10000] w-9 h-9 rounded-lg bg-card/90 backdrop-blur-md border border-border flex items-center justify-center text-foreground hover:text-primary transition-colors duration-300"
    >
      {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
    </button>
  );
};

export default ThemeToggle;
