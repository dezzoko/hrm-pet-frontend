import styled from 'styled-components';
import { useId, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Course } from '../../model/types/course';
import { Autocomplete, Button, Input } from '@/shared/ui';
import { useLazyFindCoursesCategoriesQuery } from '@/entities/CourseCategory/model/api/courseCategory.api';
import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';

interface CourseCardProps {
    onItemSaved:(item:Partial<Course> & {courseCategoryId:number})=>void;
    onClose:()=>void;
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

type Inputs = {
    'name': string;
    'description': string;
    'additionalInfoUrl': string;
}

export function CreateCourseCard(props: CourseCardProps) {
    const { onItemSaved, onClose } = props;

    const {
        register,
        handleSubmit,
    } = useForm<Inputs>();

    const [isEditing, setIsEditing] = useState(false);

    const [category, setCategory] = useState<CourseCategory>();

    const [search, { data }] = useLazyFindCoursesCategoriesQuery();

    const { t } = useTranslation();

    const onSubmit :SubmitHandler<Inputs> = (data) => {
        if (category?.id) {
            onItemSaved({ ...data, courseCategoryId: category?.id });
        }
    };

    const onSelect = (value:CourseCategory) => {
        setCategory(value);
    };

    const idForm = useId();
    return (
        <>
            <div style={{
                marginBottom: '20px',
                display: 'flex',
                justifyContent: 'space-between',
            }}
            >
                {isEditing && <Button form={idForm} type="submit">{t('save')}</Button>}
                <Button onClick={() => onClose()}>{t('cancel')}</Button>
            </div>
            <StyledCard id={idForm} onSubmit={handleSubmit(onSubmit)}>
                <Title>{t('name_course')}</Title>
                <div>

                    <Input
                        placeholder={t('name_course')}
                        {...register('name', { required: true, onChange: () => setIsEditing(true) })}
                    />
                </div>
                <Title>
                    {t('description_course')}
                    :
                </Title>
                <div>
                    <Input
                        placeholder={t('description_course')}
                        {...register('description', { onChange: () => setIsEditing(true) })}
                    />
                </div>
                <Title>
                    {t('url')}
                    :
                </Title>
                <div>
                    <Input
                        placeholder={t('url')}
                        {...register('additionalInfoUrl', { onChange: () => setIsEditing(true) })}
                    />
                </div>
                <Title>
                    {t('category')}
                    :
                </Title>
                <div>
                    <Autocomplete onSelect={onSelect} search={search} searchResults={data || []} />
                </div>
            </StyledCard>
        </>

    );
}
