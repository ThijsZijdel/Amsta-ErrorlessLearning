export class Employee {
  id: string;
  name: string;
  username: string;
  password: string;

  constructor(id: string, name: string, username: string, password: string) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
  }
}
