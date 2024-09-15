'use client'

import Wrapper from "@/components/wrapper";
import Link from "next/link";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik'
import * as yup from 'yup'
import { IUserLogin } from "@/types/user";
import { loginUser } from "@/networkcall/user";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createToken } from "@/networkcall/server";
import { useUserLogin } from "@/context/UserContext";
import { useState } from "react";

const createSchema = yup.object().shape({
   username: yup.string().required('username is required'),
   password: yup.string().required('password is required')
})

export default function Login() {
   const router = useRouter()

   const initialValues: IUserLogin = { username: "", password: "" }

   const userLogin = useUserLogin()
   const [loginId, setLoginId] = useState()

   const onLogin = async (data: IUserLogin, action: FormikHelpers<IUserLogin>) => {
      try {
         const { result, ok } = await loginUser(data)
         if(!ok) throw result.msg
         toast.success(result.msg)
         action.resetForm()
         createToken(result.token)
         localStorage.setItem('id', result.user.id)
         localStorage.setItem('username', result.user.username)
         setLoginId(userLogin.id = result.user.id)
         setLoginId(userLogin.username = result.user.username)
         
         
         router.push(`/profile/${result.user.username}`)
      } catch (err) {
         toast.error(err as string)
      }
   }

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={createSchema}
         onSubmit={(values, action) => {
            onLogin(values, action)
         }}
      >
         {
            () => {
               return (
                  <Form>
                     <Wrapper>
                        <h1 className="text-center w-full mt-28 mb-10">Please insert your username and password</h1>
                        <Field type='text' autoComplete='on' name='username' placeholder='Username' className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
                        <ErrorMessage
                           name='username'
                           component='div'
                           className='text-[12px] text-red-500'
                        />
                        <Field type='password' autoComplete='on' name='password' placeholder='Password' className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
                        <ErrorMessage
                           name='password'
                           component='div'
                           className='text-[12px] text-red-500'
                        />
                        <button type="submit" className="bg-yellow-400 px-4 rounded-md w-64 h-8 font-bold hover:brightness-105 hover:text-white">Log in</button>
                        <div className="flex h-20 items-center mb-80 xl:mb-24">
                           <h1 className="text-center w-full font-normal">Do not have an account?</h1>
                           <Link href="/signup" className="text-blue-400 w-auto text-nowrap mx-3">Sign up</Link>
                        </div>
                     </Wrapper>
                  </Form>
               )
            }
         }
      </Formik>
   )
}
