import prisma from "@/prisma";
import { Request, Response } from "express";
import { compare, genSalt, hash } from 'bcrypt'
import { sign } from 'jsonwebtoken'

export class UserController {
   async createUser(req: Request, res: Response) {
      try {
         const { username, password, referalNumber, ownedReferalNumber, coupon, couponValidUntil } = req.body

         const existingUser = await prisma.user.findUnique({
            where: { username: username }
         })
         if (existingUser) throw 'Username has been used'

         const salt = await genSalt(10)
         const hashPassword = await hash(password, salt)
         
         // const refNum = await username.slice(0,3) + Math.ceil(Math.random() * (9999 - 1000) + 1000)

         const user = await prisma.user.create({
            data: { username, password: hashPassword, ownedReferalNumber, referalNumber, coupon, couponValidUntil }
         })
         res.status(201).send({
            status: 'ok',
            msg: 'User created!',
            user
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async loginUser(req: Request, res: Response) {
      try {
         const { username, password } = req.body

         const existingUser = await prisma.user.findUnique({
            where: { username: username }
         })
         if (!existingUser) throw 'User not found'

         const isValidPass = await compare(password, existingUser.password)
         if (!isValidPass) throw 'Incorrect password'

         const payload = { id: existingUser.id, role: existingUser.role }
         const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' })

         res.status(200).send({
            status: 'ok',
            msg: 'login success',
            token,
            user: existingUser
         })

      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async getUser(req: Request, res: Response) {
      try {
         console.log(req.requestor);
         
         const users = await prisma.user.findMany()
         res.status(200).send({
            status: 'ok',
            users
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async getUserId(req: Request, res: Response) {
      try {
         const user = await prisma.user.findUnique({
            where: { id: parseInt(req.params.id) }
         })
         if (!user) throw 'User not found'
         res.status(200).send({
            status: 'ok',
            user
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }
}