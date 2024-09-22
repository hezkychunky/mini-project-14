import { IUserLogin, IUserSignup } from "@/types/user"


export const loginUser = async (data: IUserLogin) => {
   const res = await fetch('http://localhost:8000/api/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const result = await res.json()
   return { result, ok: res.ok }
}

export const signupUser = async (data: IUserSignup) => {
   const res = await fetch('http://localhost:8000/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
         'Content-Type': 'application/json'
      }
   })
   const result = await res.json()
   return { result, ok: res.ok}
}

