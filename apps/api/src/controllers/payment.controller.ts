import prisma from "@/prisma";
import { Request, Response } from "express";

export class PaymentController {
   async getPayment(req: Request, res: Response) {
      try {
         const payments = await prisma.payment.findMany({include: {konser: true}})
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
      
      const { id } = req.params

    try {
        const payment = await prisma.payment.findUnique({
            where: {id: Number(id)},
        })

        if (!payment) {
            return res.status(404).send({error: 'Payment not found'})
        } else {
            return res.status(200).json(payment)
        }
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async getPaymentByConcertId(req: Request, res: Response) {

    try {
        const payments = await prisma.payment.findMany({
            include: {konser: true},
            where: {IdKonser: parseInt(req.params.id)},
        })

        if (!payments) {
            return res.status(404).send({error: 'Payment not found'})
        } else {
            return res.status(200).send({
               status: 'ok',
               payments
            })
        }
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   
   
}

