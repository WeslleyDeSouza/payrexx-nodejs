import PayRexx from "../index";
import { PayrexxActions } from "./payrexx.actions";

import { stringify } from "qs";
import axios from "axios";

/**
 * This class represents all Transactions Actions
 * https://developers.payrexx.com/reference#transaction
 * Not tested yed
 * @2020 Weslley De Souza
 * */
export class TransactionActions extends PayrexxActions<any, any> {
  constructor(protected rex: PayRexx) {
    super();
  }

  // TRANSACTION get Retrieve a Transaction(s)
  public get(id: number, single = true) {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    return axios
      .get(this.getEndPoint(`${single ? id : ""}/`) + "&" + stringify(params))
      .then((response) => this.successHandler(response, "get" ,single ? 0 : undefined))
      .catch((err) => this.errorHandler(err));
  }

  public create(params: any) {
    return new Promise((resolve) => {
      console.log("create Transaction not implemented");
      resolve(null);
    });
  }

  public capture(id, params = {}) {
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    return axios
      .post(this.getEndPoint(`${id}/capture`), { data: stringify(params) })
      .then((response) => this.successHandler(response, "create",0))
      .catch((err) => this.errorHandler(err));
  }

  public charge(id, params: any = {}) {
    let data = stringify(params);
    params.ApiSignature = this.rex.auth.buildSignature(data);
    data = stringify(params);

    return axios
      .post(this.getEndPoint(), data)
      .then((response) => this.successHandler(response, "create",0))
      .catch((err) => this.errorHandler(err));
  }

  public refund(id, params = {}) {
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    return axios
      .post(this.getEndPoint(`${id}/refund`), { data: stringify(params) })
      .then((response) => this.successHandler(response, "create",0))
      .catch((err) => this.errorHandler(err));
  }

  public delete(id: number) {
    let params = {};
    params["ApiSignature"] = this.rex.auth.buildSignature("");
    return axios
      .delete(this.getEndPoint(`${id}/capture`), { data: stringify(params) })
      .then((response) => this.successHandler(response, "delete"))
      .catch((err) => this.errorHandler(err));
  }

  private getEndPoint(path = "") {
    return `${this.rex.getEndPoint()}Transaction/${path}?${this.rex.auth.buildUrl(
      {
        instance: this.rex.auth.getCredential().instance,
      }
    )}`;
  }
}
