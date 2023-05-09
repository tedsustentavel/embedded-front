import { PropsWithChildren, ReactNode, createContext, useState } from "react";
import { showNotification } from "@mantine/notifications";
import { User } from "../types/user";

export type AuthContextType = {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
};

interface AuthProviderProps {
  children: ReactNode;
  value?: User;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider({
  children,
}: AuthProviderProps): React.ReactElement<PropsWithChildren> {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("@webserver-user")
      ? JSON.parse(localStorage.getItem("@webserver-user")!)
      : null;

    return storedUser;
  });
  const [loading, setLoading] = useState(false);

  function signIn(email: string, password: string) {
    setLoading(true);
    // .then((userCredential) => {
    //     const userEmail = userCredential.user.email
    //       ? userCredential.user.email
    //       : '';

    //     userCredential.user.getIdToken().then((token) => {
    //       const authUser = { email: userEmail, accessToken: token };
    //       setUser(authUser);
    //       localStorage.setItem('@webserver-user', JSON.stringify(authUser));
    //     });
    //   })
    //   .catch((error) => {
    //     showNotification({
    //       title: 'Authentication Error',
    //       message: 'Incorrect email and/or password',
    //       color: 'red',
    //     });
    //   })
    //   .finally(() => setLoading(false));
  }

  function signOut() {
    // .then(() => {
    //   localStorage.removeItem('@mangoes-user');
    //   setUser(null);
    // })
    // .catch((error) => {});
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
