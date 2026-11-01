import { Page, Locator, expect } from '@playwright/test';

/** The login page (/auth/login). Holds the locators, actions, and checks for the login form. */
export class LoginPage {
  /** Page address, added to baseURL. static, so you can read it without creating a LoginPage. */
  static readonly url = '/auth/login';

  // private = only code inside this class can read these.
  // Tests can no longer reach in and assert on a locator directly.
  private readonly emailInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
  private readonly loginError: Locator;
  private readonly emailError: Locator;
  private readonly passwordError: Locator;
  private readonly registerButton: Locator;

  /** Sets up the locators. Playwright looks for the element only when a method uses it, not here. */
  constructor(private readonly page: Page) {
    this.emailInput = page.getByTestId('email');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
    this.loginError = page.getByTestId('login-error');
    this.emailError = page.getByTestId('email-error');
    this.passwordError = page.getByTestId('password-error');
    this.registerButton = page.getByTestId('register-link');
  }

  /** Opens the login page. The full address comes from baseURL in playwright.config.ts. */
  async goto(): Promise<void> {
    await this.page.goto(LoginPage.url);
  }

  /** Fills email and password, then clicks Login. Does not check the result, the test decides. */
  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  /** Clicks the register link under the login form. */
  async goToRegister(): Promise<void> {
    await this.registerButton.click();
  }

  /** Checks we are still on the login page and the Login button is visible. Use it after a failed login. */
  async expectOnLoginPage(): Promise<void> {
    await expect(this.page).toHaveURL(/auth\/login/)
    await expect(this.loginButton).toBeVisible();
  }

  /** Checks the error under the form after the server rejects the login. A partial text match is enough. */
  async expectLoginError(message: string): Promise<void> {
    await expect(this.loginError).toContainText(message);
  }

  /** Checks the "required" messages under both fields. The form shows these before anything is sent. */
  async expectFieldErrors(emailMessage: string, passwordMessage: string): Promise<void> {
    await expect(this.emailError).toContainText(emailMessage);
    await expect(this.passwordError).toContainText(passwordMessage)
  }
}