import axios from "axios";

import { AuthHelper } from "./auth/payrexx.auth";
import { PayLinkActions } from "./actions/payrexx.actions.payment";
import { GatewayActions } from "./actions/payrexx.actions.gateway";
import { SubscriptionsActions } from "./actions/payrexx.actions.subscriptions";
import {DesignActions} from "./actions/payrexx.actions.design";

export class PayRexx {

  public auth: AuthHelper = new AuthHelper(this._instance, this._secret);

  /**
   * Actions
   * */
  public paylink: PayLinkActions              = new PayLinkActions(this);
  public gateway: GatewayActions              = new GatewayActions(this);
  public subscriptions: SubscriptionsActions  = new SubscriptionsActions(this);
  public design:DesignActions                 = new DesignActions(this);

  private endPoint:string;

  constructor(private _instance, private _secret, private _v = "v1.0") {
    this.endPoint = `https://api.payrexx.com/${_v}/`;
  }

  /*
   *  URL EndPoint
   * */
  getEndPoint(): string {
    return this.endPoint;
  }

  getApiSignature(query = ""): string {
    return this.auth.buildSignature(query, this._secret);
  }

  /*
   * This endpoint can be used to verify the INSTANCE_API_SECRET to be correct.
   * In case it is not correct, you get log of the error status.
   * */
  checkSignature(): Promise<boolean> {
    let queryParams: any = {};

    queryParams.instance = this._instance;
    queryParams.ApiSignature = this.getApiSignature();

    return axios
      .get(
        this.getEndPoint() +
          "SignatureCheck/?" +
          this.auth.buildUrl(queryParams),
        {}
      )
      .then((result) => result.data.status)
      .catch((err) => console.log(err));
  }
}
export default PayRexx;
