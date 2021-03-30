import { AxiosError, AxiosResponse } from "axios";
export declare abstract class PayrexxActions {
    abstract get(id: number): Promise<any>;
    abstract create(params: any): Promise<any>;
    abstract delete(id: number): Promise<any>;
    protected successHandler(response: AxiosResponse, typ?: 'get' | 'create' | 'delete'): any;
    protected errorHandler(response: AxiosError, typ?: 'get' | 'create' | 'delete'): any;
}
