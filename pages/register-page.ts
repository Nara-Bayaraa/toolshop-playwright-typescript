import { Locator, Page } from '@playwright/test';

export type RegisterUser = {
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  country: string;
  postalCode: string;
  houseNumber: string;
  street: string;
  city: string;
  state: string;
  phoneNumber: string;
  email: string;
  password: string;
};

export class RegisterPage {
  readonly url = '/auth/register';
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateOfBirthInput: Locator;
  readonly countryInput: Locator;
  readonly postalCodeInput: Locator;
  readonly houseNumberInput: Locator;
  readonly streetInput: Locator;
  readonly cityInput: Locator;
  readonly stateInput: Locator;
  readonly phoneNumberInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly registerButton: Locator;
  readonly emailExistsError: Locator;
  readonly passwordLeakError: Locator;

  constructor(private readonly page: Page) {
    this.firstNameInput = page.getByTestId('first-name');
    this.lastNameInput = page.getByTestId('last-name');
    this.dateOfBirthInput = page.getByTestId('dob');
    this.countryInput = page.getByTestId('country');
    this.postalCodeInput = page.getByTestId('postal_code');
    this.houseNumberInput = page.getByTestId('house_number');
    this.streetInput = page.getByTestId('street');
    this.cityInput = page.getByTestId('city');
    this.stateInput = page.getByTestId('state');
    this.phoneNumberInput = page.getByTestId('phone');
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.registerButton = page.getByTestId('register-submit');
    this.emailExistsError = page.getByText('A customer with this email address already exists.');
    this.passwordLeakError = page.getByText('The given password has appeared in a data leak. Please choose a different password.');
  }

  async goto(): Promise<void> {
    await this.page.goto(this.url);
  }

  async fillForm(user: RegisterUser): Promise<void> {
    await this.firstNameInput.fill(user.firstName);
    await this.lastNameInput.fill(user.lastName);
    await this.dateOfBirthInput.fill(user.dateOfBirth);
    await this.countryInput.selectOption(user.country);

    await this.postalCodeInput.fill(user.postalCode);
    await this.houseNumberInput.fill(user.houseNumber);
    await this.streetInput.fill(user.street);
    await this.cityInput.fill(user.city);
    await this.stateInput.fill(user.state);
    await this.phoneNumberInput.fill(user.phoneNumber);
    await this.emailInput.fill(user.email);
    await this.passwordInput.fill(user.password);
  }

  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  async register(user: RegisterUser): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }
}
