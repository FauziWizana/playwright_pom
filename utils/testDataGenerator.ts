export interface UserData {
  name: string;
  email: string;
  password: string;
  title: 'Mr' | 'Mrs';
  day: string;
  month: string;
  year: string;
  firstName: string;
  lastName: string;
  company: string;
  address1: string;
  address2: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}

export class TestDataGenerator {
  private static getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  private static getRandomString(length: number): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  static generateEmail(): string {
    const timestamp = Date.now();
    const randomStr = this.getRandomString(5);
    return `test_${randomStr}_${timestamp}@example.com`;
  }

  static generateName(): string {
    const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis'];
    return `${firstNames[this.getRandomNumber(0, firstNames.length - 1)]} ${lastNames[this.getRandomNumber(0, lastNames.length - 1)]}`;
  }

  static generateUserData(): UserData {
    const fullName = this.generateName();
    const nameParts = fullName.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts[1];

    return {
      name: fullName,
      email: this.generateEmail(),
      password: 'Test@123',
      title: Math.random() > 0.5 ? 'Mr' : 'Mrs',
      day: String(this.getRandomNumber(1, 28)),
      month: String(this.getRandomNumber(1, 12)),
      year: String(this.getRandomNumber(1980, 2000)),
      firstName: firstName,
      lastName: lastName,
      company: 'Test Company Ltd',
      address1: `${this.getRandomNumber(1, 999)} Main Street`,
      address2: `Apt ${this.getRandomNumber(1, 50)}`,
      country: 'United States',
      state: 'California',
      city: 'San Francisco',
      zipcode: String(this.getRandomNumber(10000, 99999)),
      mobileNumber: `+1${this.getRandomNumber(1000000000, 9999999999)}`
    };
  }

  static generateInvalidCredentials() {
    return {
      email: 'invalid_email_' + Date.now() + '@test.com',
      password: 'WrongPassword123'
    };
  }

  static getTestUser() {
    // For test cases that need consistent user
    return {
      email: 'testuser@example.com',
      password: 'Test@123'
    };
  }
}
