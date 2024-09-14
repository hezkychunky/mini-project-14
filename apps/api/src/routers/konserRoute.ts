import { cariKonser, getAllConcerts, getTheDetailsbyID } from "@/controllers/konserController";
import { confirmPayment, createPayment, getPaymentByID } from "@/controllers/paymentController";
import { Router } from "express";

const router = Router()

//For List of Concerts
router.get('/list', getAllConcerts)
router.get('/list/:id', getTheDetailsbyID)
router.get('/search', cariKonser)

//For Payments
router.post('/payment', createPayment)
router.get('/payment/:id', getPaymentByID)
router.post('/confirm-payment', confirmPayment)

export default router