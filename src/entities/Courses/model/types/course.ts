import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';
import { User } from '@/entities/User/model/types/user';
import { Paginated } from '@/shared/api';

export interface Course{
    id:number;
    name:string;
    courseCategory:CourseCategory;
    description?:string;
    user:User;
    approvedBy?:User;
    created_at:string;
    updated_at:string;
    approvedAt:string;
    isApproved:boolean;
    additionalInfoUrl:string;

}

export interface CourseSchema {
    course?: Course;
    courseList?: Paginated<Course>;
}
