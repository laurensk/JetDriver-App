export class User {
  uuid: string;
  name: string;
  email: string;
  token: string;

  constructor(uuid: string, name: string, email: string, token: string) {
    this.uuid = uuid;
    this.name = name;
    this.email = email;
    this.token = token;
  }
}
