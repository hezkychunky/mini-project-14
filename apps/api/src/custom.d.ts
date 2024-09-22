type Requestor = {
   id: number,
   role: string
}

declare namespace Express {
   export interface Request {
      requestor?: Requestor 
   }
}