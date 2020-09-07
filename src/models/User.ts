export class User {
  uuid: string;
  email: string;
  token: string;

  constructor(uuid: string, email: string, token: string) {
    this.uuid = uuid;
    this.email = email;
    this.token = token;
  }
}
