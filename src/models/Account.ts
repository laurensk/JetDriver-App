export class Account {
  uuid: string;
  email: string;
  name: string;
  token: string;

  constructor(uuid: string, email: string, name: string, token: string) {
    this.uuid = uuid;
    this.email = email;
    this.name = name;
    this.token = token;
  }
}
