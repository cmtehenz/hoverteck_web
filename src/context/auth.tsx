import { destroyCookie, parseCookies, setCookie } from "nookies";
import { createContext, ReactNode, useEffect, useState } from "react";
import { redirect } from "react-router-dom";
import { api } from "../services/api";


type User = {
  name: string;
  email: string;
  role: string;
  avatar_url: string;
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<any>
  signOut: () => void;
  user: User | undefined;
  isAuthenticated: boolean;
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData)

// let authChannel: BroadcastChannel;

export function signOut(){
  destroyCookie(undefined, 'airlogs.token');

  
}

export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;
  
  // useEffect(() => {
  //   authChannel = new BroadcastChannel('auth');

  //   authChannel.onmessage = (message) => {
  //     switch (message.data){
  //       case 'signOut':
  //         signOut();
  //         break;
  //       default:
  //         break;
  //     }
  //   }
  // }, []);

  useEffect(() => {
    const {'airlogs.token': token} = parseCookies();

    // if(token){
    //   api.get('/auth')
    //     .then(response => {
    //       const { name, email, role, avatar_url } = response.data;
    //       setUser({name, email, role, avatar_url})
    //     }).catch(() => {
    //       signOut();
    //     })
    // }
  }, [])

  async function signIn({email, password}: SignInCredentials) {
    try {
      const response = await api.post('auth', {
        email,
        password
      })

      const { token, user } = response.data
      
      setCookie(undefined, "airlogs.token", token, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: '/'
      });

      setUser({
        name: user.name,
        email: user.email,
        role: user.role,
        avatar_url: user.avatar_url
      });

      api.defaults.headers['Authorization'] = `Bearer ${token}`;
      
    }catch(e: any){
      console.log(e);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, isAuthenticated, user, setUser}}>
      { children }
    </AuthContext.Provider>
  )
}