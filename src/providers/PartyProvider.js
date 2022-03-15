import { createContext } from "react";
import useToggle from "../hooks/useToggle";

export const PartyContext = createContext(null);

const PartyProvider = ({ children }) => {
  const [animationsEnabled, toggleAnimationsEnabled] = useToggle(true);

  return (
    <PartyContext.Provider
      value={{
        animationsEnabled,
        toggleAnimationsEnabled,
      }}
    >
      {children}
    </PartyContext.Provider>
  );
};

export default PartyProvider;
