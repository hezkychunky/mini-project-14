import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const Prisma = new PrismaClient()

export const ReviewConcert = async (req: Request, res: Response) => {
    const { rating, experience, quality, suggestions, ConcertId } = req.body

    if (!rating || !experience || !quality || !ConcertId) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const newReview = await Prisma.review.create({
            data: {
                rating: parseInt(rating, 10),
                experience,
                quality,
                suggestions,
                ConcertId: ConcertId
            },
        })
        return res.status(201).json(newReview)

    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Internal Server Error' })
    }
}

