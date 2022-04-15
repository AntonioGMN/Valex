import bcrypt from "bcrypt";
import * as cardsRepository from "../Repositories/cardRepository.js"



export function throwErro(type: string, message: string){
  throw {type, message}
}

export function validateCVC(cvc: string, hashCVC: string){
  if(!bcrypt.compareSync(cvc, hashCVC)) throwErro('Forbidden', 'Forbidden CVC for this card')
  else return true;
}

export async function getCardDataEndValide(number: string, cardholderName: string, expirationDate: string, cvc: string,){
  const cardData = await cardsRepository.findByCardDetails(number,cardholderName,expirationDate)
  
  if(!cardData) throwErro("Not Found", 'Card not found!')
  
  await validateCVC(cvc, cardData.securityCode)

  return cardData;
}