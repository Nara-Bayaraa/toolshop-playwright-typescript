import { Locator, Page, expect } from '@playwright/test';

/** Data needed to fill the register form. Built by makeUser() in test-data/user.ts. */
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

/** The register page (/auth/register). Holds the locators, actions, and checks for the register form. */
export class RegisterPage {
  /** Page address, added to baseURL. static, so you can read it without creating a RegisterPage. */
  static readonly url = '/auth/register';

  private readonly firstNameInput: Locator;
  private readonly lastNameInput: Locator;
  private readonly dateOfBirthInput: Locator;
  private readonly countryInput: Locator;
  private readonly postalCodeInput: Locator;
  private readonly houseNumberInput: Locator;
  private readonly streetInput: Locator;
  private readonly cityInput: Locator;
  private readonly stateInput: Locator;
  private readonly phoneNumberInput: Locator;
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly registerButton: Locator;
  private readonly registerError: Locator;
  private readonly firstNameError: Locator;
  private readonly passwordError: Locator;

  /** Sets up the locators. Playwright looks for the element only when a method uses it, not here. */
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
    this.registerError = page.getByTestId('register-error');
    this.firstNameError = page.getByTestId('first-name-error');
    this.passwordError = page.getByTestId('password-error');
  }

  /** Opens the register page. The full address comes from baseURL in playwright.config.ts. */
  async goto(): Promise<void> {
    await this.page.goto(RegisterPage.url);
  }

  /** Fills every field of the form from one RegisterUser. Does not submit. */
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

  /** Clicks the Register button. Does not check the result, the test decides. */
  async submit(): Promise<void> {
    await this.registerButton.click();
  }

  /** Fills the form and submits it. Does not check the result, the test decides. */
  async register(user: RegisterUser): Promise<void> {
    await this.fillForm(user);
    await this.submit();
  }

  /** Checks we are still on the register page and the Register button is visible. Use it after a failed register. */
  async expectOnRegisterPage(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/register/);
    await expect(this.registerButton).toBeVisible();
  }

  /** Checks the error under the form after the server rejects the registration. A partial text match is enough. */
  async expectRegisterError(message: string): Promise<void> {
    await expect(this.registerError).toContainText(message);
  }

  /** Checks the "required" messages under first name and password. The form shows these before anything is sent. */
  async expectFieldErrors(firstNameMessage: string, passwordMessage: string): Promise<void> {
    await expect(this.firstNameError).toContainText(firstNameMessage);
    await expect(this.passwordError).toContainText(passwordMessage);
  }
}
