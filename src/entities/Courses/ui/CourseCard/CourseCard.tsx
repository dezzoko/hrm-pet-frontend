import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    useCallback, useEffect, useId, useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Course } from '../../model/types/course';
import {
    Autocomplete, Button, ButtonSize, Input,
} from '@/shared/ui';
import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';
import { useLazyFindCoursesCategoriesQuery } from '@/entities/CourseCategory';

interface CourseCardProps {
    course: Course;
    onClose:()=>void;
    isLoading:boolean;
    isApproveEditing?:boolean;
    onSave:(course:Partial<Course>)=>void;
}

const StyledCard = styled.form`
    width:900px;
    display: grid;
    grid-template-columns: 1fr 9.5fr;
    align-items: center;
    gap: 20px; 
`;

const Title = styled.div`
    font-weight: bold;
`;
const StyledValue = styled.div`
    border-radius: 6px;
    padding: 10px;
    border-bottom: 1px solid black;
`;

type Inputs = {
    'name': string;
    'description': string;
    'additionalInfoUrl': string;
    'courseCategory': CourseCategory;
    'isApproved': boolean;
}

export function CourseCard(props: CourseCardProps) {
    const {
        course, onSave, onClose, isApproveEditing, isLoading,
    } = props;

    const {
        register,
        handleSubmit,
        setValue,

    } = useForm<Inputs>();

    const { t } = useTranslation();
    const [isEditing, setIsEditing] = useState(false);

    const [search, { data }] = useLazyFindCoursesCategoriesQuery();

    const onSubmit :SubmitHandler<Inputs> = (data) => {
        onSave({ id: course.id, ...data });
    };

    useEffect(() => {
        setValue('name', course?.name);
        setValue('description', course?.description || '');
        setValue('additionalInfoUrl', course?.additionalInfoUrl || '');
        setValue('isApproved', course?.isApproved || false);
    }, [course.additionalInfoUrl, course.description,
        course.isApproved, course.name, setValue]);
    const idForm = useId();
    const IsApprovedIconElement = useCallback(() => (course.isApproved ? (
        <FontAwesomeIcon color="green" icon={['fas', 'check']} />
    ) : (
        <FontAwesomeIcon color="red" icon={['fas', 'times']} />
    )), [course.isApproved]);
    if (isLoading) {
        return (
            <div>
                {t('loading')}
                ...
            </div>
        );
    }

    const isApprovedElement = (isEditing:boolean) => (
        <>
            <Title>
                {t('approved')}
                ?
            </Title>
            {isEditing ? (
                <Input
                    style={{
                        width: '20px',
                    }}
                    checkBox
                    {...register('isApproved')}
                    placeholder={t('approved')}
                    type="checkbox"
                />
            ) : (
                <IsApprovedIconElement />
            )}
            <Title>{t('by_whom_approved')}</Title>
            {course.isApproved ? (
                <StyledValue>{course.approvedBy?.name}</StyledValue>
            ) : (
                <StyledValue>{t('not_approved')}</StyledValue>
            )}
        </>
    );
    return (
        <>
            <div style={{
                display: 'flex',
                marginBottom: '20px',
                gap: '20px',
            }}
            >
                { !isEditing ? <Button size={ButtonSize.M} onClick={() => setIsEditing(true)}>{t('edit')}</Button>
                    : <Button size={ButtonSize.M} onClick={() => setIsEditing(false)}>{t('cancel')}</Button>}
                {isEditing && <Button size={ButtonSize.M} form={idForm} type="submit">{t('save')}</Button>}
                <Button size={ButtonSize.M} onClick={() => onClose()}>{t('cancel')}</Button>
            </div>
            <StyledCard id={idForm} onSubmit={handleSubmit(onSubmit)}>
                <Title>
                    {t('name_course')}
                    :
                </Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder={t('name')}
                            {...register('name', { required: true })}
                        />
                    ) : (
                        <StyledValue>
                            {course?.name}
                        </StyledValue>

                    )}
                </div>
                <Title>
                    {t('description_course')}
                    :
                </Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder={t('description')}
                            {...register('description')}
                        />
                    ) : (
                        <StyledValue>
                            {course?.description}
                        </StyledValue>

                    )}
                </div>
                <Title>
                    {t('category')}
                    :
                </Title>
                <div>
                    {isEditing ? (
                        <Autocomplete
                            onSelect={(value:CourseCategory) => setValue('courseCategory', value)}
                            search={search}
                            searchResults={data || []}
                            selectedValue={course.courseCategory}
                            placeholder={t('category')}
                            {...register('courseCategory')}
                        />
                    ) : (
                        <StyledValue>
                            {course?.courseCategory?.name}
                        </StyledValue>

                    )}
                </div>

                <Title>
                    {t('creator')}
                    :
                </Title>
                <StyledValue>
                    {course.user?.name}
                </StyledValue>
                <Title>
                    {t('url')}
                    :
                </Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder={t('url')}
                            {...register('additionalInfoUrl')}
                        />
                    ) : (
                        <StyledValue>
                            {course?.additionalInfoUrl}
                        </StyledValue>

                    )}
                </div>
                {isApprovedElement(isApproveEditing ? isEditing : false)}

            </StyledCard>
        </>
    );
}
