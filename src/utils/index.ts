import bcrypt from "bcrypt";
import moment from "moment"
import * as cardsRepository from "../Repositories/cardRepository.js"

export function throwErro(type: string, message: string){
  throw {type, message}
}

export function validateHash(data: string, hashData: string){
  if(!bcrypt.compareSync(data, hashData)) throwErro('Forbidden', `Forbidden hash comparation`)
  return
}

export async function getCardDataEndValide(number: string, cardholderName: string, expirationDate: string, cvc: string,){
  const cardData = await cardsRepository.findByCardDetails(number,cardholderName,expirationDate)
  
  if(!cardData) throwErro("Not Found", 'Card not found!')
  
  await validateHash(cvc, cardData.securityCode)

  return cardData;
}

export function validateExpirationDate(date){
  const now = moment().format('MM/YY')
  if(now > date) throwErro('Forbidden', 'This card has expireted')
  return
}

