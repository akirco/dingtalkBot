import axios from "axios";
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import codeMessage from "./code";
import {
  type Result,
  type instanceObject,
  formatJsonToUrlParams,
} from "./type";
const BASE_PREFIX = import.meta.env.VITE_API_BASEURL;

class Request {
  instance: AxiosInstance;
  baseConfig: AxiosRequestConfig = {
    baseURL: BASE_PREFIX,
    timeout: 60 * 1000,
    headers: { "Content-Type": "application/json; charset=utf-8" },
  };
  constructor(config?: AxiosRequestConfig) {
    let cfg = Object.assign(this.baseConfig, config);
    this.instance = axios.create(cfg);
    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = localStorage.getItem("token") as string;
        config.headers!["Authorization"] = token;
        return config;
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response: AxiosResponse) => {
        if (response.status === 200) {
          return response.data;
        }
        ElMessage.info(JSON.stringify(response.status));
        return response;
      },
      (error: AxiosError) => {
        const { response } = error;
        if (response) {
          ElMessage.error(codeMessage(response.status));
          return Promise.reject(response.data);
        }
        ElMessage.warning("网络连接异常,请稍后再试!");
        return Promise.reject(error);
      }
    );
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config);
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.get(url, config);
  }

  public post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<Result<T>> {
    return this.instance.post(url, data, config);
  }

  public put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.put(url, data, config);
  }

  public delete<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.delete(url, config);
  }

  public upload<T = any>(
    url: string,
    file: FormData | File,
    config: AxiosRequestConfig = {
      headers: { "Content-Type": "multipart/form-data" },
    }
  ): Promise<AxiosResponse<Result<T>>> {
    return this.instance.post(url, file, config);
  }

  public download(url: string, data: instanceObject) {
    window.location.href = `${BASE_PREFIX}/${url}?${formatJsonToUrlParams(
      data
    )}`;
  }
}
export default Request;
