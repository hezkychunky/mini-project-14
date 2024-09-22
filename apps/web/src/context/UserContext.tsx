'use client'

import { createContext, useEffect, useState} from 'react';

typeof window !== 'undefined'
const getInitialState = () => {
   const defaultLoginUser = sessionStorage.getItem('defaultLoginUser');
   return defaultLoginUser ? JSON.parse(defaultLoginUser) : {id: 0, username: null}
}

// const UserLoginContext = createContext<LoginUser>(defaultLoginUser)
const UserLoginContext = createContext<any>(null)

export const UserLoginProvider = ({ children }: { children: React.ReactNode }) => {

   const [defaultLoginUser, setDefaultLoginUser] = useState(getInitialState)

   useEffect(() => {
      sessionStorage.setItem("defaultLoginUser", JSON.stringify(defaultLoginUser))
  }, [defaultLoginUser])
   
   return (
      // <UserLoginContext.Provider value={defaultLoginUser}>
      <UserLoginContext.Provider value={{defaultLoginUser, setDefaultLoginUser}}>
         {children}
      </UserLoginContext.Provider>
   )
}

// export const useUserLogin = () => useContext(UserLoginContext)
export const useUserLogin = UserLoginContext

