import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient()

export const getPaymentByID = async (req: Request, res: Response) => {
    const { id } = req.params

    try {
        const payment = await Prisma.payment.findUnique({
            where: {id: Number(id)},
        })

        if (!payment) {
            return res.status(404).send({error: 'Payment not found'})
        } else {
            return res.status(200).json(payment)
        }
    } catch (error) {
        console.error("Error fetching Payment: ", error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export const createPayment = async (req: Request, res: Response) => {
    const { konserId, referralCode } = req.body
    const sampleUserId: number = 1
    try {
        const eventDetail = await Prisma.event_details.findUnique({
            where: {
                konserId: Number(konserId),
            },
        })

        if (!eventDetail) {
            return res.status(404).send({
                status: 'Event not Found'
            })
        }

        let price = eventDetail.harga || 0
        let discount = 0

        if(eventDetail.discountExpiry && new Date() <= eventDetail.discountExpiry) {
            discount = eventDetail.discount || 0
        }

        if (referralCode && eventDetail.referralCode === referralCode) {
            discount += 10
        }

        const finalAmount = price - (price * (discount / 100))

        const Payment = await Prisma.payment.create({
            data: {
                IdKonser: Number(konserId),
                userId: sampleUserId,
                amount: finalAmount,
                status: 'pending'
            }
        })

        res.status(201).json({
            message: 'Payment Created Succesfully, please pay in Cash',
            Payment,
        })

    } catch (error) {
        console.error("Error processing payment:", error)
        return res.status(500).json({error: 'Internal Server Error'})
    }
}

export const confirmPayment = async (req: Request, res: Response) => {
    const { paymentID } = req.body

    try {
        const updatePayment = await Prisma.payment.update({
            where: {id: Number(paymentID)},
            data: {status: 'confirmed'}
        })
        if(!updatePayment) {
            return res.status(400).send({error: 'Payment not Found'})
        } else {
            return res.status(200).json(updatePayment)
        }
    } catch (error) {
        console.error("Internal server Error:", error)
    }
}