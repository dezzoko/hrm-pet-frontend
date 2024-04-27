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
    createdAt:string;
    updatedAt:string;
    isApproved:boolean;
    additionalInfoUrl:string;

}

export interface CourseSchema {
    course?: Course;
    courseList?: Paginated<Course>;
}
