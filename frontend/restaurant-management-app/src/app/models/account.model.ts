export class Account {
  AccountID: number;
  Username: string;
  Password: string;
  Role: string;
  PhoneNumber: string;

  constructor(accountID: number, username: string, password: string, role: string, phoneNumber: string) {
    this.AccountID = accountID;
    this.Username = username;
    this.Password = password;
    this.Role = role;
    this.PhoneNumber = phoneNumber;
  }
}
