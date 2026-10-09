import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import paths from 'router/path';

const UserContext = createContext<UserContextType | undefined>(undefined);
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const UserProvider = ({ children }: ContextProps) => {
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? (JSON.parse(savedUser) as User) : null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem('token') !== null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem('token', user.token!);
    } else {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  }, [user]);

  const login = useCallback((user: User) => {
    setUser(user);
    setIsAuthenticated(true);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.href = paths.login;
  }, []);
  const isDonor = () => user?.is_donor === true;
  const isReceiver = () => user?.is_receiver === true;

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
        isDonor,
        isReceiver,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
