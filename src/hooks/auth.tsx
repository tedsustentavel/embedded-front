import { ReactNode, createContext } from "react";
import { AuthProvider } from "./AuthProvider";

export type AuthContextType = {
  user: string | null;
  loading: boolean;
  signIn: (username: string, password: string) => void;
  signOut: () => void;
};

export interface AuthProviderProps {
  children: ReactNode;
  value?: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export default AuthProvider;
