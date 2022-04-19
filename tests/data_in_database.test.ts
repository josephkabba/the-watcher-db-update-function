import { DataSource } from "typeorm";
import { getDatabase } from "../the-watcher-db-update-function/database";
import { ArticleModel } from "../the-watcher-db-update-function/models/local/model";

const getDataFromDatabase = async (type: "l" | "g", database: DataSource) => {
  const data = await database
    .getRepository(ArticleModel)
    .createQueryBuilder("article")
    .where("article.type = :type", { type })
    .limit(10)
    .getMany();

  return data;
};

jest.setTimeout(1000000);
describe("check for data in database", () => {
  let database: DataSource;

  beforeAll(async () => {
    return getDatabase()
      .then((datasource) => {
        database = datasource;
      })
      .catch((error) => {
        throw new Error(error.message);
      });
  });

  afterAll(async () => {
    await database.destroy();
  });

  it("get local data from database", async () => {
    let data: ArticleModel[];
    try {
      data = await getDataFromDatabase("l", database);

      expect(data.length).not.toBe(0);
    } catch (error: any) {
      throw new Error(error.message);
    }
  });

  it("get global data from database", async () => {
    let data: ArticleModel[];
    try {
      data = await getDataFromDatabase("g", database);

      expect(data.length).not.toBe(0);
    } catch (error: any) {
      throw new Error(error.message);
    }
  });
});
