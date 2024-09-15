import prisma from "@/prisma"
import { NextFunction, Request, Response } from "express"


export const createRef = async (req: Request, res: Response, next: NextFunction) => {
   try {

      let { username } = req.body
      const refNum = username.slice(0, 3) + Math.ceil(Math.random() * (9999 - 1000) + 1000)

      req.body.ownedReferalNumber = refNum

      next()
   } catch (err) {
      res.status(400).send({
         status: 'error',
         msg: err
      })
   }
}

export const checkRef = async (req: Request, res: Response, next: NextFunction) => {
   // mengecek apakah RefNumber yang baru digenerate sudah dimiliki oleh user lain atau belum
   try {

      let { ownedReferalNumber } = req.body
      const existingRefNum = await prisma.user.findUnique({
         where: { ownedReferalNumber: ownedReferalNumber }
      })
      // kalau ada yang sama (sudah dimiliki user lain), maka lakukan generate ref lagi
      if (existingRefNum) { createRef(req, res, next) }
      
      // kalau sudah unik, maka next proccess
      next()
   } catch (err) {
      res.status(400).send({
         status: 'error',
         msg: err
      })
   }
}

export const validateRef = async (req: Request, res: Response, next: NextFunction) => {
   try {
      if(req.body.referalNumber) {
         let { referalNumber } = req.body
      const existingRefNum = await prisma.user.findUnique({
         where: { ownedReferalNumber: referalNumber }
      })
         if (!existingRefNum) throw 'invalid referral number'

         // create expiry date = now + 3 months
         const currentDate = new Date()
         const expiryDate = new Date(currentDate.setMonth(currentDate.getMonth()+3))

         // set discount coupon for new registered user & passing data via req.body
         req.body.coupon = true
         req.body.couponValidUntil = expiryDate

         // set/ create new bonus points & its expiry date (+3 months) to the referral owner
         const addBonus = await prisma.bonus.create({
            data: {
              amount: 10000,
              validUntil: expiryDate,
              owner: {
                connect: {
                  ownedReferalNumber: referalNumber
                },
              },
            },
          })
      }

      next()
   } catch (err) {
      res.status(400).send({
         status: 'error',
         msg: err
      })
   }
}