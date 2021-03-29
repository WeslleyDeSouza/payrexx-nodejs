import {AxiosError, AxiosResponse} from "axios";

export abstract class PayrexxActions {

    abstract get(id:number);

    abstract create(params:any);

    abstract delete(id:number);

    protected successHandler(response:AxiosResponse, typ: 'get'|'create'|'delete' = null){
        if(typ == 'create')
        return response.data.data;



        return response.data
    }

    protected errorHandler(response:AxiosError , typ: 'get'|'create'|'delete' = null){
       if(response){
           console.log(  response.response.data )
       }


        return
    }
}
