import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { RolesEnum } from '@/shared/constants';

export interface SidebarItemType {
    path: string;
    icon: IconProp;
    text:string;
    authOnly?: boolean;
    roles?: RolesEnum[];
}
