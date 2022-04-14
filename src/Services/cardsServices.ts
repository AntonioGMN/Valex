import * as employeesRepository from "../Repositories/employeeRepository.js"
import * as cardsRepository from "../Repositories/cardRepository.js"

export async function createCard(employeeId: number, cardType: string){
  const employeeDates = await employeesRepository.findById(employeeId);
  console.log(employeeDates)
}
