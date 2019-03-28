import { User } from './User';

export class Project {
  idProject: number;
  userO: User;
  nameCreator: string;
  projectName: String;
  idType: number;
  description: string;
  dateStart: Date;
  dateFinish: Date;
  img: string;
  projectStatus: number;

  constructor() { }
}
