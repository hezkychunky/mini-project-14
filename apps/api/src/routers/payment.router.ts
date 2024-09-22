import { PaymentController } from "@/controllers/payment.controller";
import { Router } from "express";

export class PaymentRouter {
   private router: Router
   private paymentController: PaymentController

   constructor() {
      this.paymentController = new PaymentController()
      this.router = Router()
      this.initializeRoutes()
   }

   private initializeRoutes(): void {
      this.router.get('/', this.paymentController.getPayment)
      this.router.get('/:id', this.paymentController.getPaymentId)
      this.router.get('/concert/:id', this.paymentController.getPaymentByConcertId)
   }

   getRouter(): Router {
      return this.router
   }
}