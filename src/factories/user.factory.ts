import { Faker, faker } from "@faker-js/faker";

export const enterYourInfo= () =>{

    return {

        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        zipcode: faker.location.zipCode()
        
    }

}