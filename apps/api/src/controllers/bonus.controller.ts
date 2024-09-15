import prisma from "@/prisma";
import { Request, Response } from "express";

export class BonusController {
   async getBonus(req: Request, res: Response) {
      try {
         // console.log(req.requestor);
         
         const bonuses = await prisma.bonus.findMany()
         res.status(200).send({
            status: 'ok',
            bonuses
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }
   // parseInt(req.params.id)
   async getBonusId(req: Request, res: Response) {
      try {
         const bonuses = await prisma.bonus.findMany()

         // melakukan filter bonus milik Logged-in User yang masih valid/ belum expired
         const sortedBonus = await bonuses.filter((item:any) => item.ownerId === parseInt(req.params.id) && item.validUntil >= new Date())
         if (!sortedBonus) throw 'Bonus not found'
         res.status(200).send({
            status: 'ok',
            sortedBonus
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }
}