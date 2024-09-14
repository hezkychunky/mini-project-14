export interface Konser {
  id: number,
  namaKonser: string,
  deskripsiKonser: string,
  gambarKonser: string,
  lokasi: string,
  tanggal: string,
  waktu: string,
  event_details: EventDetails[]
}

export interface EventDetails {
  konserId: number,
  harga?: number, // Make it optional if it can be null in Prisma
  isPaidEvent?: boolean, // Align with Prisma field name
  availableSeats: number,
  ticketType?: string, // Optional if nullable in Prisma
  referralCode?: string,
  discount?: number,
  discountExpiry?: Date, // Match Prisma field name
}