import PayRexx from "../index";
import { DeleteResponse, identified, PayrexxActions} from "./payrexx.actions";

const axios = require("axios");
const qs = require("qs");

class Design {

  name: string
  //Name of the design

  default?: 0 | 1
  //Set to 1 if design should be default design. Set to 0 otherwise.

  fontFamily?: string
  //Arial, Courier New, Georgia, Open Sans, Times New Roman or Verdana

  fontSize?: number
  //int32 In pixel

  textColor?: string
  //Hex code without #

  textColorVPOS?: string
  //Hex code without #

  linkColor?: string
  //Hex code without #

  linkHoverColor?: string
  //Hex code without #

  buttonColor?: string
  //Hex code without #

  buttonHoverColor?: string
  //Hex code without #

  background?: string
  //color or image

  backgroundColor?: string
  //Hex code without #

  headerBackground?: string
  //color or image

  headerBackgroundColor?: string
  //Hex code without #

  emailHeaderBackgroundColor?: string
  //Hex code without #

  headerImageShape?: 'square' | 'rectangular' | 'round';

  useIndividualEmailLogo?: 0 | 1

  logoBackgroundColor?: string
  //Hex code without #

  logoBorderColor?: string
  //Hex code without #

  VPOSGradientColor1?: string
  //Hex code without #

  VPOSGradientColor2?: string
  //Hex code without #

  enableRoundedCorners?: 0 | 1


  VPOSBackground?: string
  //color or image

  headerImage?: any
  //CURLFile object


  backgroundImage?: any
  //CURLFile object


  headerBackgroundImage?: any
  //CURLFile object


  emailHeaderImage?: any
  //CURLFile object


  VPOSBackgroundImage?: any
  //CURLFile object

  constructor(e = null) {

  }

  public setDefault(value:boolean){
    this.default = value ? 1 : 0;
  }
  public setName(name:string){
    this.name = name
  };
  public setHeaderImageShape(headerImageShape: 'square' | 'rectangular' | 'round'){
    this.headerBackgroundImage = headerImageShape
  };
  public setLogoBackgroundColor(val:string){
    this.logoBackgroundColor = val
  }
  public setLogoBorderColor(val:string){
    this.logoBorderColor = val;
}; // Hex code
  public setBackground(val:string){
    this.background = val;
  }; // color or image
  public setBackgroundColor(val:string){
    this.backgroundColor = val
  }; // Hex code
  public setHeaderBackground(val:string){

  }; // color or image
  public setHeaderBackgroundColor(val:string){

  }; // Hex code
  public setVPOSGradientColor1(val:string){

  }; // Hex code
  public setVPOSGradientColor2(val:string){

  }; // Hex code
  public setFontFamily(val:string){
    this.fontFamily = val;
  };
  public setFontSize(val: any){
    this.fontSize = val;
  };
  public setTextColor(val:string){
    this.textColor = val
  };
  public setTextColorVPOS(val:string){
    this.textColorVPOS = val;
  };
  public setLinkColor(val:string){
    this.linkColor = val
  };
  public setLinkHoverColor(val:string){
    this.linkHoverColor = val
  };
  public setButtonColor(val:string){
    this.buttonHoverColor = val;
  };
  public setButtonHoverColor(val:string){
    this.buttonHoverColor = val;
  };
  public setEnableRoundedCorners(val:boolean){
    this.enableRoundedCorners = val ? 1 :0;
};
  public setUseIndividualEmailLogo(val:boolean) {
  this.useIndividualEmailLogo = val ? 1 : 0;
  };
}

interface IDesignResponse {

  "uuid": string,
  "default": number,
  "name": string
  "fontFamily": string,
  "fontSize": string,
  "textColor": string
  "textColorVPOS": string
  "linkColor": string
  "linkHoverColor": string
  "buttonColor": string
  "buttonHoverColor": string
  "background": string,
  "backgroundColor": string
  "headerBackground": string
  "headerBackgroundColor": string
  "emailHeaderBackgroundColor": string
  "headerImageShape": string
  "useIndividualEmailLogo": number,
  "logoBackgroundColor": string
  "logoBorderColor": string
  "VPOSGradientColor1": string,
  "VPOSGradientColor2": string,
  "enableRoundedCorners": number,
  "headerImage": string,
  "backgroundImage": string,
  "headerBackgroundImage": string
  "emailHeaderImage": string
}


/**
 * This class represents all Design Actions
 * https://developers.payrexx.com/reference#retrieve-a-design
 *
 * @2021 Weslley De Souza
 * */
export class DesignActions extends PayrexxActions<any, IDesignResponse> {


  constructor(protected rex: PayRexx) {
    super();
  }

  instance(params = {}):Design{
    return  new Design(params);
  }

  get(id: number): Promise<IDesignResponse> {
    throw new Error("Method not implemented.");
  }

  create(params: any): Promise<IDesignResponse> {
    throw new Error("Method not implemented.");
  }

  delete(id: number): Promise<DeleteResponse<identified>> {
    throw new Error("Method not implemented.");
  }

  private getEndPoint(path = ""):string {
    return `${this.rex.getEndPoint()}Design/${path}?${this.rex.auth.buildUrl({
      instance: this.rex.auth.getCredential().instance,
    })}`;
  }
}
