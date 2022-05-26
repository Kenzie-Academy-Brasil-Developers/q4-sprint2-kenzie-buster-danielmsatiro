import { Request } from "express";
import { Dvd, Stock } from "../entities";
import { dvdRepository, stockRepository } from "../repositories";

import { AssertsShape } from "yup/lib/object";
import { serializedCreateDvdSchema } from "../schemas/dvd/createDvd.schema";
import { ErrorHandler } from "../errors";
import { IDvdCreateList } from "../@types/express";

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

    const newDvds = await dvdRepository.save(dvds);

    return await serializedCreateDvdSchema.validate(
      { dvds: newDvds },
      {
        stripUnknown: true,
      }
    );
  };

  listDvds = async (): Promise<AssertsShape<any>> => {
    const dvds = await dvdRepository.all();
    return { dvds };
    return serializedCreateDvdSchema.validate({ dvds }, { stripUnknown: true });
  };
}

export default new DvdService();
