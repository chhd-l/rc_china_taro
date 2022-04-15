import { GraphQLFetcher } from "./types/api/fetcher";
import { getError } from "./handle-fetch-response";
import Taro from "@tarojs/taro";

const fetchGraphqlApi: GraphQLFetcher = async (
  query: string,
  { variables } = {},
  fetchOptions
) => {
  const res = await Taro.request({
    url: "https://service-95f0hoaq-1300709250.gz.apigw.tencentcs.com/release/graphql",
    method: "POST",
    data: {
      query,
      variables,
    },
    header: {
      ...fetchOptions?.headers,
      "Content-Type": "application/json",
    },
  });

  const { data, errors, status } = await res.data;
  console.log("12121", errors, status, data, res);
  if (errors) {
    throw getError(errors, status);
  }

  return { data, res };
};
export default fetchGraphqlApi;
