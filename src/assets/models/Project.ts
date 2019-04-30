import { User } from './User';
import { SafeUrl } from '@angular/platform-browser';

export class Project {
  idProject: number;
  userO: User = new User();
  nameCreator: string = "";
  projectName: String = "";
  idType = { "nameType": "" };
  description: string = "";
  dateStart: Date = new Date();
  dateFinish: Date = new Date();
  img: string = "";
  /* img_safe: SafeUrl = ""; */
  projectStatus: number = 0;

  constructor() { }
}
