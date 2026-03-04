import { createContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        errors,
        setUser,
        setIsAuthenticated,
        setIsLoading,
        setErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
