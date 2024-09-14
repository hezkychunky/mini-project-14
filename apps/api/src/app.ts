import express, {
  json,
  urlencoded,
  Express,
  Request,
  Response,
  NextFunction,
} from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { PORT } from './config'; // Assuming you have a config file that exports PORT
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

  // Start the server
  public start(): void {
    this.app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  }
}
