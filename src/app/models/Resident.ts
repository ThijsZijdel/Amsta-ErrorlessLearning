export class Resident {
  id: string;
  name: string;
  surname: string;
  imgPath: string;
  loggedIn: boolean;

  constructor(id: string, name: string, surname: string, imgPath: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.imgPath = imgPath;
    this.loggedIn = false;
  }
}
