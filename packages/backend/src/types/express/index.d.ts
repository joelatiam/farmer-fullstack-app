import { Request } from 'express';
import Farmer from '../../common/database/models/Farmer';


declare global {
  namespace Express {
    interface Request {
      farmer?: Farmer;
    }
  }
}
