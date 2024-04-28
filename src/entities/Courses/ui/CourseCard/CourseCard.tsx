import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Course } from '../../model/types/course';
import { Autocomplete, Button, Input } from '@/shared/ui';
import { useUpdateCourseMutation } from '../../model/api/course.api';
import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';
import { useLazyFindCoursesCategoriesQuery } from '@/entities/CourseCategory';

interface CourseCardProps {
    course: Course;
    onItemChange:(open:boolean)=>void
    onClose:()=>void;
    isApproveEditing?:boolean;
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
        course, onItemChange, onClose, isApproveEditing,
    } = props;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const [isEditing, setIsEditing] = useState(false);

    const [updateCourseMutation, { isSuccess, isLoading }] = useUpdateCourseMutation();

    const [search, { data }] = useLazyFindCoursesCategoriesQuery();

    const onSubmit :SubmitHandler<Inputs> = (data) => {
        updateCourseMutation({ id: course.id, ...data });
    };

    useEffect(() => {
        setValue('name', course.name);
        setValue('description', course.description || '');
        setValue('additionalInfoUrl', course.additionalInfoUrl || '');
        setValue('isApproved', course.isApproved || false);
    }, [course.additionalInfoUrl, course.description,
        course.isApproved, course.name, setValue]);

    useEffect(() => {
        if (isSuccess) {
            onItemChange(false);
        }
    }, [isSuccess, onItemChange]);

    const isApprovedElement = isEditing ? (
        <>
            <Title>Подтвержден?</Title>
            <Input {...register('isApproved')} placeholder="Подтвержден" type="checkbox"></Input>
            <Title>Кем подтверждён?</Title>
            {course.isApproved ? (
                <StyledValue>{course.approvedBy?.name}</StyledValue>
            ) : (
                <StyledValue>Не подтвержден</StyledValue>
            )}
        </>
    ) : (
        <>
            <Title>Подтвержден?</Title>
            {course.isApproved ? (
                <FontAwesomeIcon color="green" icon={['fas', 'check']} />
            ) : (
                <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />
            )}
            <Title>Кем подтверждён?</Title>
            {course.isApproved ? (
                <StyledValue>{course.approvedBy?.name}</StyledValue>
            ) : (
                <StyledValue>Не подтвержден</StyledValue>
            )}
        </>
    );
    const idForm = useId();
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

                {isApproveEditing ? (
                    isApprovedElement
                ) : (
                    <>
                        <Title>Подтвержден?</Title>
                        {course.isApproved ? (
                            <FontAwesomeIcon color="green" icon={['fas', 'check']} />
                        ) : (
                            <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />
                        )}
                        <Title>Кем подтверждён?</Title>
                        {course.isApproved ? (
                            <StyledValue>{course.approvedBy?.name}</StyledValue>
                        ) : (
                            <StyledValue>Не подтвержден</StyledValue>
                        )}
                    </>
                )}
            </StyledCard>
        </>
    );
}
