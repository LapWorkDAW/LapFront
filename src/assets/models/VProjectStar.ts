import { User } from './User';
import { Project } from './Project';

export class VProjectStar {
    idVoteUser: number;
    userVote: User;
    project: Project;
    quantity: Number;
}
