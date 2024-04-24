import { HttpMethod } from "../enum/httpMethods";
import { env } from "../env";

export const sendRequest = async (
  axiosInstance: any,
  method: HttpMethod,
  url: string,
  data?: any
): Promise<any> => {
  const config: any = {
    method,
    url,
    headers: {
      Authorization: env,
      "Content-Type": "application/json",
    },
    data,
  };

  try {
    return await axiosInstance(config);
  } catch (error) {
    throw error;
  }
};
