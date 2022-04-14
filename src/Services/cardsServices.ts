import * as employeesRepository from "../Repositories/employeeRepository.js"
import * as cardsRepository from "../Repositories/cardRepository.js"
import {GenCC} from "creditcard-generator"
import generator from "br-document-generator"
import bcrypt from "bcrypt";
import moment  from "moment"
import {TransactionTypes} from "../Repositories/cardRepository.js"
moment.locale('pt-br');

export async function createCard(employeeId: number, type: TransactionTypes){
  const validateCard = await cardsRepository.findByTypeAndEmployeeId(type, employeeId)
  if(validateCard) throw {
    type: "Conflict",
		message: `This employee already have this card type!`
  }

  const creditCard = await generator.creditCard("master");
  const cardholderName = await handlerCardName(employeeId);
  const number = GenCC("Mastercard");
  const expirationDate = moment().add(5, "year").format("MM/YY");
  const securityCode = await bcrypt.hashSync(creditCard.cvv, 8);

  const cardData = {
    employeeId,
    number,
    cardholderName,
    securityCode,
    expirationDate,
    password: null,
    isVirtual: false,
    originalCardId: null,
    isBlocked: false,
    type,
  }

  cardsRepository.insert(cardData)

  return cardData;
}

async function handlerCardName(employeeId: number){
  const {fullName} = await employeesRepository.findById(employeeId);
  if(fullName.split(" ").length < 2) return fullName;
  
  const response = [];
  const split = fullName.split(" ").filter(s=>s.length>=3);
  for (let i = 0; i < split.length; i++) {
   if(i !=0 && i != split.length-1) response.push(split[i][0])
   else response.push(split[i])
  }
  return response.join(" ");
}

