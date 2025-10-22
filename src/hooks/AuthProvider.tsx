import { PropsWithChildren, useState } from "react";
import { userAuth } from "../services/signIn";
import { AuthProviderProps, AuthContext } from "./auth";

export function AuthProvider({
  children,
}: AuthProviderProps): React.ReactElement<PropsWithChildren> {
  const [user, setUser] = useState<string | null>(() => {
    const storedUser = localStorage.getItem("@webserver-user")
      ? localStorage.getItem("@webserver-user")
      : null;

    return storedUser;
  });
  const [loading, setLoading] = useState(false);

  async function signIn(username: string, password: string) {
    setLoading(true);

    userAuth(username, password)
      .then(() => {
        setUser(username);
        localStorage.setItem("@webserver-user", username);
        localStorage.setItem("@webserver-password", password);
      })
      .catch(() => {
        alert("Incorrect username and/or password");
      })
      .finally(() => setLoading(false));
  }

  function signOut() {
    localStorage.removeItem("@webserver-user");
    localStorage.removeItem("@webserver-password");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
