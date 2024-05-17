import Farmer from '../../../common/database/models/Farmer';
import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

export const signup = async (req: Request, res: Response): Promise<Response> => {
  const { name, landSize, email, password, walletBalance } = req.body;

  try {
    const existingFarmer = await Farmer.findOne({ where: { email } });
    if (existingFarmer) {
      return res.status(409).json({ message: "Email already in use" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newFarmer = await Farmer.create({
      name,
      landSize,
      email,
      password: hashedPassword,
      walletBalance
    });

    return res.status(201).json({
      message: 'Success',
      data: {
        ...newFarmer.get(),
        password: undefined
      }
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Error signing up farmer", error: error.message });
  }
};
