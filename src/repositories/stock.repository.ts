import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { Stock } from "../entities";

interface IStockRepo {
  create: (stock: Partial<Stock>) => Promise<Stock>;
  save: (stock: Partial<Stock>) => Promise<Stock>;
  findOne: (payload: object) => Promise<Stock>;
}

class StockRepo implements IStockRepo {
  private ormRepo: Repository<Stock>;

  constructor() {
    this.ormRepo = AppDataSource.getRepository(Stock);
  }
  create = async (stock: Partial<Stock>) => await this.ormRepo.create(stock);
  save = async (stock: Partial<Stock>) => await this.ormRepo.save(stock);

  findOne = async (payload: object) => {
    return await this.ormRepo.findOneBy({ ...payload });
  };
}

export default new StockRepo();
