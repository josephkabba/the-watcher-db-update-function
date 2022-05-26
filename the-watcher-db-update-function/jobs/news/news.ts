import { RemoteArticle } from "../../models/remote/news.response";
import { NewsArticalsResponse } from "../../models/remote/news.response";
import { AxiosRequestConfig, AxiosResponse } from "axios/index.d";
import axios from "axios";

export const getNews = async (
  country: "US" | "UG"
): Promise<RemoteArticle[]> => {
  const options: AxiosRequestConfig = {
    method: "GET",
    url: "https://api.newscatcherapi.com/v2/latest_headlines",
    params: {
      lang: "en",
      page: "1",
      countries: country,
      page_size: "25",
    },
    headers: {
      "x-api-key": "9h70U7ombGZmDAZN6qO1cmjeyQqphbYZtwXFkLbPidE",
    },
  };

  const response = await axios.request<
    any,
    AxiosResponse<NewsArticalsResponse, any>,
    any
  >(options);

  return response.data.articles;
};
