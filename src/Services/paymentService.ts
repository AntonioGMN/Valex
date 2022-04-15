import * as rechargeRepository from "../Repositories/rechargeRepository.js"
import * as businessesRePository from "../Repositories/businessRepository.js"
import * as utils from "../utils/index.js"
import * as paymentRepository from "../Repositories/paymentRepository.js"


export async function payment(number: string, cardholderName: 
  string, expirationDate: string, cvc: string, password: string, 
  businessId: number, amount: number)
  {
  utils.validateExpirationDate(expirationDate)
  
  const {id: cardId, password: passwordHash, type: cardType }  = await utils.getCardDataEndValide(number, cardholderName, expirationDate, cvc)
  utils.validateHash(password, passwordHash)

  const {type: businessType} = await businessesRePository.findById(businessId)
  validateTypes(cardType, businessType)

  const cardRecharges = await rechargeRepository.findByCardId(cardId)
  const cardRechargesAmount  = rechargesAmount(cardRecharges)
  console.log(cardRechargesAmount)

  if(cardRechargesAmount > amount){
    const paymentData = {
      cardId, businessId, amount 
    }
    paymentRepository.insert(paymentData)
  }
  
  return;
}

function validateTypes(cardType: string, businessType: string){
  if(cardType != businessType) utils.throwErro('Conflict', 'Conflit on card type and bussiness type')
  return
}

function rechargesAmount(array){
  const initialValue = 0;
   
  return array.map(a=>a.amount).reduce((previousValue, currentValue) => previousValue + currentValue,
  initialValue)
}