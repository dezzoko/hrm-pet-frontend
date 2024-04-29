import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    useCallback, useEffect, useId, useState,
} from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Course } from '../../model/types/course';
import { Autocomplete, Button, Input } from '@/shared/ui';
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
        formState: { errors },
    } = useForm<Inputs>();

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
        return <div>Loading...</div>;
    }

    const isApprovedElement = (isEditing:boolean) => (
        <>
            <Title>Подтвержден?</Title>
            {isEditing ? (
                <Input
                    style={{
                        width: '20px',
                    }}
                    checkBox
                    {...register('isApproved')}
                    placeholder="Подтвержден"
                    type="checkbox"
                />
            ) : (
                <IsApprovedIconElement />
            )}
            <Title>Кем подтверждён?</Title>
            {course.isApproved ? (
                <StyledValue>{course.approvedBy?.name}</StyledValue>
            ) : (
                <StyledValue>Не подтвержден</StyledValue>
            )}
        </>
    );
    return (
        <>
            <div style={{
                marginBottom: '20px',
                gap: '20px',
            }}
            >
                { !isEditing ? <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
                    : <Button onClick={() => setIsEditing(false)}>Отменить</Button>}
                {isEditing && <Button form={idForm} type="submit">Сохранить</Button>}
                <Button onClick={() => onClose()}>Закрыть</Button>
            </div>
            <StyledCard id={idForm} onSubmit={handleSubmit(onSubmit)}>
                <Title>Название курса:</Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder="Название"
                            {...register('name', { required: true })}
                        />
                    ) : (
                        <StyledValue>
                            {course.name}
                        </StyledValue>

                    )}
                </div>
                <Title>Описание курса:</Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder="Описание"
                            {...register('description')}
                        />
                    ) : (
                        <StyledValue>
                            {course.description}
                        </StyledValue>

                    )}
                </div>
                <Title>Категория</Title>
                <div>
                    {isEditing ? (
                        <Autocomplete
                            onSelect={(value:CourseCategory) => setValue('courseCategory', value)}
                            search={search}
                            searchResults={data || []}
                            selectedValue={course.courseCategory}
                            placeholder="Категория"
                            {...register('courseCategory')}
                        />
                    ) : (
                        <StyledValue>
                            {course?.courseCategory?.name}
                        </StyledValue>

                    )}
                </div>

                <Title>Создал:</Title>
                <StyledValue>
                    {course.user.name}
                </StyledValue>
                <Title>Ссылка:</Title>
                <div>
                    {isEditing ? (
                        <Input
                            placeholder="Ссылка"
                            {...register('additionalInfoUrl')}
                        />
                    ) : (
                        <StyledValue>
                            {course.additionalInfoUrl}
                        </StyledValue>

                    )}
                </div>
                {isApprovedElement(isApproveEditing ? isEditing : false)}

            </StyledCard>
        </>
    );
}
