import type { AxiosResponse } from "axios";
import { axiosInstance } from "./utils";

class API<T> {
  constructor(private endpoint: string) {}

  getAll(controller?: AbortController) {
    return axiosInstance.get<T[]>(this.endpoint, {
      signal: controller?.signal,
    });
  }

  create<P>(payload: P) {
    return axiosInstance.post<P, AxiosResponse<T>>(this.endpoint, payload, {
      headers: { "Content-Type": "application/json" },
    });
  }

  patch<P>(id: string | number, payload: P) {
    return axiosInstance.patch<P, AxiosResponse<T>>(
      `${this.endpoint}/${id}`,
      payload,
      { headers: { "Content-Type": "application/json" } },
    );
  }

  delete(id: string | number) {
    return axiosInstance.delete(`${this.endpoint}/${id}`);
  }
}

export default API;
