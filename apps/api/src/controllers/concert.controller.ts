import prisma from "@/prisma";
import { Request, Response } from "express";

export class ConcertController {
   async getConcert(req: Request, res: Response) {
      try {
         const concerts = await prisma.konser.findMany({include: {Payment: true}})
         res.status(200).send({
            status: 'ok',
            concerts
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }

   async getConcertId(req: Request, res: Response) {
      try {
         const concert = await prisma.konser.findUnique({
            where: { id: parseInt(req.params.id) },
            include: {
               Payment: true
            }
         })
         if (!concert) throw 'Concert not found'

         res.status(200).send({
            status: 'ok',
            concert
         })
      } catch (err) {
         res.status(400).send({
            status: 'error',
            msg: err
         })
      }
   }
}