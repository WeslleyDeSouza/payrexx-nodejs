import {AxiosError, AxiosResponse} from "axios";

export abstract class PayrexxActions {

    abstract get(id:number):Promise<any>;

    abstract create(params:any):Promise<any>;

    abstract delete(id:number):Promise<any>;

    protected successHandler(response:AxiosResponse, typ: 'get'|'create'|'delete' = null){
        if(typ == 'create')
        return response.data.data;

        return response.data
    }

    protected errorHandler(response:AxiosError , typ: 'get'|'create'|'delete' = null){
       if(response){
           console.log(  response.response.data )
       }
        return undefined
    }
}
