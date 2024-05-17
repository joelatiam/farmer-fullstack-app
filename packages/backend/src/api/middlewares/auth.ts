import { Request, Response, NextFunction } from 'express';
import Farmer from '../../common/database/models/Farmer';
import bcrypt from 'bcrypt';

interface AuthRequest extends Request {
    farmer?: any;
  }

export async function authenticateFarmer(req: AuthRequest, res: Response, next: NextFunction) {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }
  
    try {
      const farmer = await Farmer.findOne({ where: { email } });
      if (!farmer) {
        return res.status(404).json({ message: 'Invalid credentials' });
      }
  
      const match = await bcrypt.compare(password, farmer.password);
      if (!match) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
  
      req.farmer = farmer;
      next();
    } catch (error: any) {
      res.status(500).json({ message: 'Authentication failed', error: error.message });
    }
  }
  