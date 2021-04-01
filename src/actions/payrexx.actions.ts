import { AxiosError, AxiosResponse } from "axios";

export interface identified {
    "id":number
}

export interface DeleteResponse<Data extends identified = identified> {
    "status":string,
    "data":[Data]
}

export abstract class PayrexxActions<Input, Response> {

    abstract get(id:number):Promise<Response>;

    abstract create(params:Input):Promise<Response>;

    abstract delete(id:number):Promise<DeleteResponse>;

    protected successHandler(response:AxiosResponse, type:'get' | 'create' | 'delete' = null, index = undefined) {
        if (type == 'create') {
            return index !== undefined && response.data.data && response.data.data[index] ?
                response.data.data[index] :
                response.data.data;
        }
        return index !== undefined && response.data[index] ? response.data[index] : response.data
    }

    protected errorHandler(response:AxiosError, typ:'get' | 'create' | 'delete' = null) {
        if (response) {
            console.log(response.response.data)
        }
        return undefined
    }
}
