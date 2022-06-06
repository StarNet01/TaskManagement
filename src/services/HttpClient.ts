import axois, { AxiosInstance, AxiosResponse, AxiosRequestConfig } from "axios";

export default class HttpClient {
  private baseURL: string;
  private instance: AxiosInstance;
  constructor(private token?: string) {
    this.baseURL = process.env.REACT_APP_API_URL as string;
    this.instance = axois.create();
    this.instance.defaults.baseURL = this.baseURL;
    this.setToken(this.token || "");
  }

  setToken(token: string) {
    this.instance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  public get<T, R = AxiosResponse<T>>(
    endpoint: string,
    token?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setToken(token || "");
    return this.instance.get(endpoint, config);
  }

  public post<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    token?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setToken(token || "");
    return this.instance.post(endpoint, data, config);
  }

  public put<T, B, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    token?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setToken(token || "");
    return this.instance.put(endpoint, data, config);
  }

  public patch<T, B = {}, R = AxiosResponse<T>>(
    endpoint: string,
    data?: B,
    token?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setToken(token || "");
    return this.instance.patch(endpoint, data, config);
  }

  public delete<T, R = AxiosResponse<T>>(
    endpoint: string,
    token?: string,
    config?: AxiosRequestConfig
  ): Promise<R> {
    this.setToken(token || "");
    return this.instance.delete(endpoint, config);
  }
}
