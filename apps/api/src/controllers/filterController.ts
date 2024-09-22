import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const Prisma = new PrismaClient()

export const FilteringSearch = async (req: Request, res: Response) => {
    const { city, limit = 10, page = 1, priceRange } = req.query
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string)

    let query = `
        SELECT * 
        FROM konser
        INNER JOIN event_details on konser.id = event_details.konserId
        WHERE SUBSTRING_INDEX(konser.lokasi, ', ', -1) = ?
    `

    let queryParams: any[] = [city]

    if (priceRange) {
        switch (priceRange) {
            case '0-500000':
                query += ` AND event_details.harga BETWEEN 0 AND 500000`
                break
            case '500000-1000000':
                query += ` AND event_details.harga BETWEEN 500000 AND 1000000`
                break
            case '1000000-1500000':
                query += ` AND event_details.harga BETWEEN 1000000 AND 1500000`
                break
            case '1500000+':
                query += ` AND event_details.harga > 1500000`
                break
            default:
                break
        }
    }

    query += ` ORDER BY konser.createdAt DESC LIMIT ? OFFSET ?;`
    queryParams.push(parseInt(limit as string), offset)

    try {
        const FilteredEvents = await Prisma.$queryRawUnsafe(query, ...queryParams)
        res.status(200).json(FilteredEvents)

    } catch (error) {
        console.error("Error on Internal Server: ", error)
        res.status(500).json({ error: 'Error Occured while fetching Events' })
    }
}