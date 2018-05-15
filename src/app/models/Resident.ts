export class Resident {
  id: string;
  name: string;
  surname: string;
  imgPath: string;

  constructor(id: string, name: string, surname: string, imgPath: string) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.imgPath = imgPath;
  }
}
