import { DataSource } from "typeorm";
import { getDatabase } from "./database";
import { getNews } from "./jobs/news/news";
import { mapStoryToArticle } from "./mappers/mappers";
import { ArticleModel } from "./models/local/model";

const execute = async (country: "UG" | "US", database: DataSource) => {
  const articles = await getNews(country);

  if (articles.length > 0) {
    await database
      .getRepository(ArticleModel)
      .createQueryBuilder("article")
      .delete()
      .from(ArticleModel)
      .execute();

    for (let i = 0; i < articles.length; i++) {
      const article =
        country === "US"
          ? mapStoryToArticle(articles[i], "g")
          : mapStoryToArticle(articles[i], "l");
      const model = new ArticleModel(article);
      const repo = await database.manager.save(model);
    }
  }
};

export const updateDB = async () => {
  const database = await getDatabase();
  try {
    await execute("UG", database);
    await execute("US", database);
  } catch (err: any) {
    throw new Error(err);
  } finally {
    database.destroy();
  }
};
