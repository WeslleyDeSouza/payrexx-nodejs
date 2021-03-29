import { AxiosError, AxiosResponse } from "axios";
export declare abstract class PayrexxActions {
    abstract get(id: number): any;
    abstract create(params: any): any;
    abstract delete(id: number): any;
    protected successHandler(response: AxiosResponse, typ?: 'get' | 'create' | 'delete'): any;
    protected errorHandler(response: AxiosError, typ?: 'get' | 'create' | 'delete'): void;
}
