import { getAuth, signInWithPopup, onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
type AuthContextType = {
  user: UserType | undefined,
  signInWithGoogle: () => Promise<void>;
}

type UserType = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType);


export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<UserType>();
  const provider = new GoogleAuthProvider();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        const { displayName, photoURL, uid } = user;
        if (!displayName || !photoURL) {
          throw new Error('Missing information from Google Accont.');
        }
        setUser({
          id: uid,
          name: displayName,
          avatar: photoURL
        })
      }
    });

    return () => {
      unsubscribe();
    }

  }, [])

  async function signInWithGoogle() {

    const result = await signInWithPopup(auth, provider);
    if (result.user) {
      const { displayName, photoURL, uid } = result.user;
      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Accont.');
      }
      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }
  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      {props.children}
    </AuthContext.Provider>
  );
}