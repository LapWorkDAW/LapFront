import { User } from './User';
import { Post } from './Post';

export class Message {
    idMessage: number;
    post: Post;
    receiver: User;
}
