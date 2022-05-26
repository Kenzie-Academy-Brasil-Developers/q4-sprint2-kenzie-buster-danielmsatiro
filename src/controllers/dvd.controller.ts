import { Request, Response } from "express";
import { dvdService } from "../services";

class DvdController {
  createDvd = async (req: Request, res: Response) => {
    const dvds = await dvdService.createDvd(req);

    return res.status(201).json(dvds);
  };

  listDvds = async (_: Request, res: Response) => {
    const dvds = await dvdService.listDvds();

    return res.status(200).json(dvds);
  };

  buyDvd = async (req: Request, res: Response) => {
    const dvdId = req.params.dvdId;

    try {
      const carts = await dvdService.buyDvd(dvdId, req);

      return res.status(201).json(carts);
    } catch (err) {
      return res.status(err.statusCode).json(err.message);
    }
  };
}

export default new DvdController();
