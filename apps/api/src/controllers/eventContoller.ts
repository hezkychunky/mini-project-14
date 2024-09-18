import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import Upload from "@/middlewares/uploadMiddleware";
import path from 'path'

const Prisma = new PrismaClient();

export const MakeEvent =[Upload.single('image'), async (req: Request, res: Response) => {
    const {
        namaKonser,
        harga,
        tanggal,
        waktu,
        lokasi,
        deskripsiKonser,
        availableSeats,
        ticketType,
        isPaidEvent,
        discount,
        discountExpiry
    } = req.body;

    try {
        // Validate and format date
        if (!tanggal) {
            return res.status(400).json({ error: "Missing 'tanggal' field." });
        }

        const formattedDate = new Date(tanggal);
        if (isNaN(formattedDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format for 'tanggal'" });
        }

        const seats = parseInt(availableSeats, 10)
        const eventDiscount = discount !== undefined ? parseFloat(discount) : undefined

        // Validate required fields
        if (!namaKonser || !deskripsiKonser) {
            return res.status(400).json({ error: "Missing required fields: 'namaKonser' or 'deskripsiKonser'" });
        }

        let ImagePath = ''
        if (req.file) {
            ImagePath = path.join(`/images/${req.file.filename}`)
        }

        const formattedPrice = parseInt(harga, 10)

        const MakeData = await Prisma.konser.create({
            data: {
                namaKonser,
                tanggal: formattedDate,
                waktu: waktu || "Unknown", // Provide default value if needed
                lokasi: lokasi || "Unknown", // Provide default value if needed
                deskripsiKonser,
                gambarKonser: ImagePath,
                event_details: {
                    create: {
                        harga: isPaidEvent ? formattedPrice : null,
                        isPaidEvent: isPaidEvent || false,
                        availableSeats: seats || 0, // Provide default value if needed
                        ticketType: ticketType || "General Admission", // Provide default value if needed
                        discount: eventDiscount || 0, // Default to 0 if not provided
                        discountExpiry: discountExpiry ? new Date(discountExpiry) : undefined
                    }
                }
            }
        });

        res.status(201).json(MakeData);
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Failed to create the event", details: error });
    }
}];
