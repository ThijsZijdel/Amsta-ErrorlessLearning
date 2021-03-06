import {Activity} from "./Activity";

export class Resident {
  id: number;
  name: string;
  surname: string;
  bio: string;
  imgPath: string;
  activities: Activity[];

  constructor(id: number, name: string, surname: string, bio: string, imgPath: string, activities: Activity[]) {
    this.id = id;
    this.name = name;
    this.surname = surname;
    this.bio = bio;
    this.imgPath = imgPath;
    this.activities = activities;
  }
}

