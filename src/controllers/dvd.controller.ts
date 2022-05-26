import { Request, Response } from "express";
import dvdService from "../services/dvd.service";

class DvdController {
  createDvd = async (req: Request, res: Response) => {
    const dvds = await dvdService.createDvd(req);

    return res.status(201).json(dvds);
  };

  listDvds = async (_: Request, res: Response) => {
    const dvds = await dvdService.listDvds();

    return res.status(200).json(dvds);
  };
}

export default new DvdController();
