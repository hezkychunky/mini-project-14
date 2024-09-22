import { MakeEvent } from "@/controllers/eventContoller";
import { FilteringSearch } from "@/controllers/filterController";
import { cariKonser, getAllConcerts, getTheDetailsbyID } from "@/controllers/konserController";
import { confirmPayment, createPayment, getPaymentByID } from "@/controllers/paymentController";
import { ReviewConcert } from "@/controllers/reviewController";
import Upload from "@/middlewares/uploadMiddleware";
import { Router } from "express";

const router = Router()

//For List of Concerts
router.get('/list', getAllConcerts)
router.get('/list/:id', getTheDetailsbyID)
router.get('/search', cariKonser)

//For Filtering Search
router.get('/filters', FilteringSearch)

//For Payments
router.post('/payment', createPayment)
router.get('/payment/:id', getPaymentByID)
router.post('/confirm-payment', confirmPayment)

//For Post the Concert
router.post('/make-event', Upload.single('gambarKonser'), MakeEvent)

//For the Review
router.post('/reviews', ReviewConcert)


export default router