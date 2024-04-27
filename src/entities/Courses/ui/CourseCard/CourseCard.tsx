import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Course } from '../../model/types/course';
import { Button, ButtonTheme, Input } from '@/shared/ui';
import { useUpdateCourseMutation } from '../../model/api/course.api';

interface CourseCardProps {
    course: Course;
    onItemChange:(open:boolean)=>void
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
}

export function CourseCard(props: CourseCardProps) {
    const { course, onItemChange } = props;

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Inputs>();

    const [isEditing, setIsEditing] = useState(false);

    const [updateCourseMutation, { isSuccess, isLoading }] = useUpdateCourseMutation();

    const onSubmit :SubmitHandler<Inputs> = (data) => {
        updateCourseMutation({ id: course.id, ...data });
    };

    useEffect(() => {
        setValue('name', course.name);
        setValue('description', course.description || '');
        setValue('additionalInfoUrl', course.additionalInfoUrl || '');
    }, [course.additionalInfoUrl, course.description, course.name, setValue]);

    useEffect(() => {
        if (isSuccess) {
            onItemChange(false);
        }
    }, [isSuccess, onItemChange]);

    const idForm = useId();
    return (
        <>
            <div style={{
                marginBottom: '20px',
            }}
            >
                { !isEditing ? <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
                    : <Button onClick={() => setIsEditing(false)}>Закрыть</Button>}
                {isEditing && <Button form={idForm} type="submit">Сохранить</Button>}
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

                <Title>Подтвержден?</Title>
                {course.isApproved ? <FontAwesomeIcon color="green" icon={['fas', 'check']} />
                    : <FontAwesomeIcon color="red" icon={['fas', 'xmark']} />}
                <Title>Кем подтверждён?</Title>
                {course.isApproved ? <StyledValue>{course.approvedBy?.name}</StyledValue>
                    : <StyledValue>Не подтвержден</StyledValue>}

            </StyledCard>
        </>

    );
}
