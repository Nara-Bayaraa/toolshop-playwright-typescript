import { faker } from '@faker-js/faker';
import { RegisterUser } from '../pages/register-page';

export function makeUser(): RegisterUser {
  
  return {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    dateOfBirth: '1990-01-01',
    country: 'US',
    postalCode: faker.location.zipCode({ format: '#####' }),
    houseNumber: faker.location.buildingNumber(),
    street: faker.location.street(),
    city: faker.location.city(),
    state: 'Illinois',
    phoneNumber: faker.string.numeric(10),
    email: faker.internet.email({ provider: `${Date.now()}.example.com` }),
    password: `${faker.internet.password({ length: 12 })}Aa1!`,
  };
}
