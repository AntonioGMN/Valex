import * as employeesRepository from "../Repositories/employeeRepository.js"
import * as cardsRepository from "../Repositories/cardRepository.js"
import {TransactionTypes} from "../Repositories/cardRepository.js"
import { faker } from '@faker-js/faker';
import bcrypt from "bcrypt";
import moment  from "moment"
moment.locale('pt-br');


export async function createCard(employeeId: number, type: TransactionTypes){
  const validateCard = await cardsRepository.findByTypeAndEmployeeId(type, employeeId)
  
  if(validateCard) throw {
    type: "Conflict",
		message: `This employee already have this card type!`
  }
 
  const cardholderName = await handlerCardName(employeeId);
  const number = faker.finance.creditCardNumber('mastercard')
  const expirationDate = moment().add(5, "year").format("MM/YY");
  const securityCode = await hashSecurityCode();

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

function hashSecurityCode() {
  const cvc = faker.finance.creditCardCVV();
  console.log(cvc)
  return bcrypt.hashSync(cvc,8);
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

export async function ativateCard(number: string, cardholderName: string, expirationDate: string, cvc: string, password: string) {
  const cardData = await cardsRepository.findByCardDetails(number,cardholderName,expirationDate)
  
  if(!cardData) throwErro("Not Found", 'Card not found!')
  if(cardData.password)  throwErro("Conflict", 'This card is already active!')
  validateCVC(cvc, cardData.securityCode);

  const hashPassword = bcrypt.hashSync(password,8);
  const updateCard = {...cardData, password: hashPassword}
 
  await cardsRepository.update(cardData.id, updateCard)

  return cardData;
}

function throwErro(type: string, message: string){
  throw {type, message}
}

function validateCVC(cvc: string, hashCVC: string){
  if(!bcrypt.compareSync(cvc, hashCVC)) throwErro('Forbidden', 'Forbidden CVC for this card')
  else return true;
}