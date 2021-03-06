import { DataSource } from "typeorm";
import { ArticleModel } from "./models/local/model";

const AppDataSource = new DataSource({
  type: "postgres",
  host: "ppl-server.postgres.database.azure.com",
  port: 5432,
  username: "admin_ppl",
  password: "PPLdatabase1234",
  database: "postgres",
  synchronize: true,
  logging: false,
  entities: [ArticleModel],
  subscribers: [],
  migrations: [],
  ssl: true,
});

export const getDatabase = async () => {
  if (!AppDataSource.isInitialized) {
    await AppDataSource.initialize();
  }
  return AppDataSource;
};
