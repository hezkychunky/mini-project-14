import { ConcertController } from "@/controllers/concert.controller";
import { Router } from "express";

export class ConcertRouter {
   private router: Router
   private concertController: ConcertController

   constructor() {
      this.concertController = new ConcertController()
      this.router = Router()
      this.initializeRoutes()
   }

   private initializeRoutes(): void {
      this.router.get('/', this.concertController.getConcert)
      this.router.get('/:id', this.concertController.getConcertId)
   }

   getRouter(): Router {
      return this.router
   }
}