'use client'

import { createContext, useContext} from 'react';

type LoginUser = {
   id: number
   username: any
}

const defaultLoginUser: LoginUser = { id: 0, username: null }

const UserLoginContext = createContext<LoginUser>(defaultLoginUser)

export const UserLoginProvider = ({ children }: { children: React.ReactNode }) => {

   return (
      <UserLoginContext.Provider value={defaultLoginUser}>
         {children}
      </UserLoginContext.Provider>
   )
}

export const useUserLogin = () => useContext(UserLoginContext)