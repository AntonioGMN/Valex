import * as rechargeRepository from "../Repositories/rechargeRepository.js"
import * as utils from "../utils/index.js"
import moment from "moment"


export async function recharge(number: string, cardholderName: string, expirationDate: string, cvc: string, amount: number){
  utils.validateExpirationDate(expirationDate)
  
  const {id }  = await utils.getCardDataEndValide(number, cardholderName, expirationDate, cvc)
  const rechargeData = { cardId: id, amount}
  await rechargeRepository.insert(rechargeData)

  return;
}

