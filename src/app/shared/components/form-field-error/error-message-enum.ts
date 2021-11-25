import { FormControl } from "@angular/forms";


export enum ErrorMessageEnum {

  MINLENGHT =  "TESTE",
  MAXLENGHT = "TESTE 2"

}


function getFormTypeAndReturnMessage(errorMessage:ErrorMessageEnum) {

  for (const key in ErrorMessageEnum) {

      if (ErrorMessageEnum[key] === errorMessage){

        return errorMessage[key];

      }

      return undefined;

  }

}


