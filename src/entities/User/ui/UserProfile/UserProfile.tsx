import { User } from '../../model/types/user';
import { UserProfileHeader } from '../UserProfileHeader';

interface UserProfileProps {
    user:User
}
export function UserProfile(props: UserProfileProps) {
    const { user } = props;

    return (
        <div>
            <UserProfileHeader user={user}></UserProfileHeader>
        </div>
    );
}
