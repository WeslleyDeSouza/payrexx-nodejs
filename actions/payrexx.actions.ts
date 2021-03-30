import {AxiosError, AxiosResponse} from "axios";

export abstract class PayrexxActions {

    abstract get(id:number):Promise<any>;

    abstract create(params:any):Promise<any>;

    abstract delete(id:number):Promise<any>;

    protected successHandler(response:AxiosResponse, typ: 'get'|'create'|'delete' = null, index = undefined){
        if(typ == 'create'){
          return index !== undefined && response.data.data && response.data.data[index] ?
              response.data.data[index] :
                response.data.data;
        }
        return response.data
    }

    protected errorHandler(response:AxiosError , typ: 'get'|'create'|'delete' = null){
       if(response){
           console.log(  response.response.data )
       }
        return undefined
    }
}
