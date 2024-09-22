'use client'

import { signupUser } from '@/networkcall/user'
import { IUserSignup } from '@/types/user'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import * as yup from 'yup'

const createSchema = yup.object().shape({
   username: yup.string().required('username is required'),
   password: yup.string()
      .min(6, 'password must be at least 6 characters')
      .required('password is required'),
   referalNumber: yup.string()
})

export default function Signup() {
   const router = useRouter()

   const initialValues: IUserSignup = { username: "", password: "", referalNumber: "" }

   const handleSignUp = async (data: IUserSignup) => {
      try {
         const { result, ok } = await signupUser(data)
         if(!ok) throw result.msg
         router.push('/login')
      } catch (err) {
         toast.error(err as string)
      }
   }

   return (
      <Formik
         initialValues={initialValues}
         validationSchema={createSchema}
         onSubmit={(values) => {
            handleSignUp(values)
         }}
      >
         {
            () => {
               return (
                  <Form>
                     <div className="w-full h-auto flex flex-col justify-center items-center gap-4 font-sans font-medium">
                        <h1 className="text-center w-full mt-24 mb-10">Please register your username and password</h1>
                        <h1 className='font-medium text-sm'>Get <span className='text-red-600 font-bold'>10% discount coupon </span>by register using referral number</h1>
                        <Field type='text' autoComplete='on' name='username' placeholder='Username' className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
                        <ErrorMessage
                           name='username'
                           component='div'
                           className='text-[12px] text-red-500'
                        />
                        <Field type='password' name='password' autoComplete='on' placeholder='Password' className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
                        <ErrorMessage
                           name='password'
                           component='div'
                           className='text-[12px] text-red-500'
                        />
                        <Field type='referalNumber' name='referalNumber' autoComplete='on' placeholder='Referral Number (optional)' className="border-[1px] h-10 border-gray-500 rounded-sm px-4 w-64" />
                        <ErrorMessage
                           name='referalNumber'
                           component='div'
                           className='text-[12px] text-red-500'
                        />
                        <button type="submit" className="bg-yellow-400 px-4 rounded-md w-64 h-8 font-bold hover:brightness-105 hover:text-white">Sign up</button>
                        <div className="flex h-20 items-center mb-72 xl:mb-10">
                           <h1 className="text-center w-full font-normal">Already have an account?</h1>
                           <Link href="/login" className="text-blue-400 w-auto text-nowrap mx-3">Log in</Link>
                        </div>
                     </div>
                  </Form>
               )
            }
         }
      </Formik>
   )
}