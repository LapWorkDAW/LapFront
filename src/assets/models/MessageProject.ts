import { Post } from './Post';
import { Project } from './Project';

export class MessageProject {
    idMessageProject: string;
    post: Post = new Post();
    project: Project;
}
