import React from "react";
import useTheme from "../../hooks/useTheme";
import "./header.css";

const Header = React.memo(() => {
  const { isDarkTheme, onToggleTheme } = useTheme();

  return (
    <header className="header">
      <h2>Todos</h2>
      <button
        onClick={onToggleTheme}
        aria-label={`${
          isDarkTheme ? "Change to Light Theme" : "Change to Dark Theme"
        }`}
      >
        {isDarkTheme ? "🌞" : "🌚"}
      </button>
    </header>
  );
});

export default Header;
