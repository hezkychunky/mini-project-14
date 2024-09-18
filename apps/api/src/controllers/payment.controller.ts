import prisma from "@/prisma";
import { Request, Response } from "express";

export class PaymentController {
   async getPayment(req: Request, res: Response) {
      try {
         const payments = await prisma.payment.findMany()
         res.status(200).send({
            status: 'ok',
            payments
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async getPaymentId(req: Request, res: Response) {
      try {
         const payments = await prisma.payment.findMany()

         const paymentByConcertId = await payments.filter((item:any) => item.IdKonser === parseInt(req.params.id))
         res.status(200).send({
            status: 'ok',
            paymentByConcertId
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }
}