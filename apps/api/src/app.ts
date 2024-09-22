import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import { PORT } from './config';
import { UserRouter } from './routers/user.router';
import { BonusRouter } from './routers/bonus.router';
import { PaymentRouter } from './routers/payment.router';
import { ConcertRouter } from './routers/concert.router';
import bodyParser from 'body-parser';
// import { PORT } from './config'; // Assuming you have a config file that exports PORT
import router from './routers/konserRoute'; // Your Konser router

export default class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.configure();
    this.routes();
    this.handleError();
  }

  // Configure middleware
  private configure(): void {
    this.app.use(cors());
    this.app.use(json());
    this.app.use(urlencoded({ extended: true }));
    this.app.use(bodyParser.json()); // Needed for parsing request bodies
  }

  // Define the API routes
  private routes(): void {
    // Konser routes under /api/konsers
    this.app.use('/api/konsers', router);
  }

  // Error handling
  private handleError(): void {
    // Handle 404 (Not Found)
    this.app.use((req: Request, res: Response, next: NextFunction) => {
      if (req.path.includes('/api/')) {
        res.status(404).send('Not found!');
      } else {
        next();
      }
    });

    // General error handler
    this.app.use(
      (err: Error, req: Request, res: Response, next: NextFunction) => {
        if (req.path.includes('/api/')) {
          console.error('Error: ', err.stack);
          res.status(500).send('Error!');
        } else {
          next();
        }
      }
    );
  }

  private routes(): void {
    const userRouter = new UserRouter()
    const bonusRouter = new BonusRouter()
    const paymentRouter = new PaymentRouter()
    const concertRouter = new ConcertRouter()

    this.app.get('/api', (req: Request, res: Response) => {
      res.send(`Hello, Purwadhika Student API!`);
    });
    this.app.use('/api/users', userRouter.getRouter())

    this.app.use('/api/bonuses', bonusRouter.getRouter())

    this.app.use('/api/payments', paymentRouter.getRouter())

    this.app.use('/api/concerts', concertRouter.getRouter())
  }

  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
