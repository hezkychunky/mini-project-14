import { BonusController } from "@/controllers/bonus.controller";
import { Router } from "express";

export class BonusRouter {
   private router: Router
   private bonusController: BonusController

   constructor() {
      this.bonusController = new BonusController()
      this.router = Router()
      this.initializeRoutes()
   }

   private initializeRoutes(): void {
      this.router.get('/', this.bonusController.getBonus)
      this.router.get('/:id', this.bonusController.getBonusId)
   }

   getRouter(): Router {
      return this.router
   }
}