import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Initialize theme from localStorage (class-based dark mode)
try {
	const theme = localStorage.getItem("bazaario_theme");
	if (theme === "dark") document.documentElement.classList.add("dark");
	else document.documentElement.classList.remove("dark");
} catch (e) {
	// ignore (e.g., SSR or blocked storage)
}

createRoot(document.getElementById("root")!).render(<App />);
