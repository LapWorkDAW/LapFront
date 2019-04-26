import { User } from './User';
import { Post } from './Post';

export class MessageUser {
    idMessage: number;
    post: Post;
    receiver: User;
}
