import {Activity} from "./Activity";

export class Resident {
  id: string;
  name: string;
  surname: string;
  imgPath: string;
  activities: Activity[];

  constructor(id: string, name: string, surname: string, imgPath: string, activities: Activity[]) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.imgPath = imgPath;
    this.activities = activities;
  }
}
