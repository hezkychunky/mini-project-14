import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const cariKonser = async (req: Request, res: Response) => {
  const queryParams = req.query.query
  const query = typeof queryParams === 'string' ? queryParams : ''

  try {
    const results = await prisma.konser.findMany({
      where: {
        OR: [
          { namaKonser: { contains: query, } },
          { lokasi: { contains: query, } },
          { deskripsiKonser: { contains: query } },
        ],
      },
    })

    return res.status(200).json(results)

  } catch (error) {
    console.error('Error searching the Concert: ', error);
    return res.status(500).json({ error: 'Internal Server Error' })
  }
}

export const getAllConcerts = async (req: Request, res: Response) => {
  try {
    const concerts = await prisma.konser.findMany({
      include: {
        event_details: true,
      },
    });
    res.status(200).json(concerts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch concerts' });
  }
};

export const getTheDetailsbyID = async (req: Request, res: Response) => {
  const id = req.params.id

  if (!id || isNaN(parseInt(id as string, 10))) {
    return res.status(400).json({ error: 'Invalid ID' });
  }

  try {
    const concerts = await prisma.konser.findUnique({
      where: {
        id: parseInt(id as string, 10),
      },
      include: {
        event_details: true
      },
    })
    if (!concerts) {
      res.status(404).json({ error: 'The Connection was Reset' })
    } else {
      res.status(200).json(concerts)
    }
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Error' })
  }
}