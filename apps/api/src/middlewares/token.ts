import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type IUser = {
   id: number,
   role: string
}

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
   try {
      const token = req.header("Authorization")?.replace("Bearer ", "")
      if(!token) throw 'Token is empty'

      const verifiedToken = verify(token, process.env.SECRET_JWT!)
      
      req.requestor = verifiedToken as IUser
      
      next()

   } catch (err) {
      res.status(400).send({
         status: 'error',
         msg: err
      })
   }
}

export const checkAdmin = async (req:Request, res: Response, next: NextFunction) => {
   try {
      if(req.requestor?.role !== 'Admin') throw 'You are not authorized'

      next()
   } catch (err) {
      res.status(400).send({
         status: 'error',
         msg: err
      })
   }
}