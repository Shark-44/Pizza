import { createContext, useContext, useState, ReactNode } from "react";
import Cookies from "js-cookie";

// Définir le type pour le contexte utilisateur
type UserContextType = {
  user: number | null;
  setUser: (user: number | null) => void;
};

// Créer un contexte avec ce type ou `undefined`
const CurrentUserContext = createContext<UserContextType | undefined>(undefined);

// Hook pour utiliser le contexte utilisateur
export const useAuthContext = () => {
  const context = useContext(CurrentUserContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a CurrentUserContextProvider");
  }
  return context;
};


type CurrentUserContextProviderProps = {
  children: ReactNode;
};


export const CurrentUserContextProvider = ({ children }: CurrentUserContextProviderProps) => {

  const cookieUserId = Cookies.get('userId');
  const [user, setUser] = useState<number | null>(cookieUserId ? parseInt(cookieUserId, 10) : null);

  return (
    <CurrentUserContext.Provider value={{ user, setUser }}>
      {children}
    </CurrentUserContext.Provider>
  );
};
