import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface SidebarItemType {
    path: string;
    icon: IconProp;
    text:string;
    authOnly?: boolean;
}
