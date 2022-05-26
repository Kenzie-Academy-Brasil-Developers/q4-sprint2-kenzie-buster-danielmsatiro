import { Request } from "express";
import { Dvd, Stock } from "../entities";
import { dvdRepository, stockRepository } from "../repositories";

import { AssertsShape } from "yup/lib/object";
import { serializedDvdSchema } from "../schemas/dvd";
import { ErrorHandler } from "../errors";
import { IDvdCreateList } from "../@types/express";
import { cartService } from "./";

class DvdService {
  createDvd = async (req: Request): Promise<AssertsShape<any>> => {
    if (!req.userAuth) {
      throw new ErrorHandler(401, {
        error: "missing admin permission",
      });
    } else if (!req.userAuth.isAdm) {
      throw new ErrorHandler(401, {
        error: {
          name: "JsonWebTokenError",
          message: "jwt malformed",
        },
      });
    }

    const dvdsCreate = req.validated as IDvdCreateList;

    const dvds: Dvd[] = dvdsCreate.dvds.map((dvd) => {
      const { price, quantity, name, duration } = dvd;
      const newStock = { ...new Stock(), price, quantity };
      return { ...new Dvd(), name, duration, stock: newStock };
    });

    for (let dvd of dvds) {
      const newStock = Object.assign(new Stock(), dvd.stock);
      dvd.stock = await stockRepository.save(newStock);
    }

    const newDvds = await dvdRepository.saveMany(dvds);

    return await serializedDvdSchema.validate(
      { dvds: newDvds },
      {
        stripUnknown: true,
      }
    );
  };

  listDvds = async (): Promise<AssertsShape<any>> => {
    const dvds = await dvdRepository.all();
    return { dvds };
    return serializedDvdSchema.validate({ dvds }, { stripUnknown: true });
  };

  buyDvd = async (dvdId: string, req: Request): Promise<AssertsShape<any>> => {
    if (!req.userAuth) {
      throw new ErrorHandler(401, {
        error: "missing admin permission",
      });
    }

    const dvd = await dvdRepository.findOne({ id: dvdId });

    if (!dvd) {
      throw new ErrorHandler(402, {
        error: `dvd not found`,
      });
    }

    const quantity = req?.body?.quantity;

    if (quantity > dvd.stock.quantity) {
      throw new ErrorHandler(422, {
        error: `current stock: ${dvd.stock.quantity}, received demand ${quantity}`,
      });
    }

    return cartService.createCart(dvd, req.userAuth, quantity);
  };
}

export default new DvdService();
