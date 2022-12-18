import { AxiosResponse } from "axios";

interface CreateAxiosResponse<T> extends Partial<AxiosResponse> {
  data: T;
}

export function createAxiosResponse<T>({
  data,
  ...rest
}: CreateAxiosResponse<T>) {
  const axiosResponse: AxiosResponse<T> = {
    data,
    status: 200,
    statusText: "",
    headers: {},
    config: {},
    ...rest,
  };

  return axiosResponse;
}
