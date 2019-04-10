import { User } from './User';

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
  projectStatus: number = 0;

  constructor() { }
}
