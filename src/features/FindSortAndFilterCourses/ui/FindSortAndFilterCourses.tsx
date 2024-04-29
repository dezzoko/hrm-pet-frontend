import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button, Input } from '@/shared/ui';
import { CategoryAutocomplete } from '@/features/CategoryAutocomplete';
import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';

export type SortFilterCoursesInputs = {
    search?: string;
    approved?: boolean;
    categoryId?: number ;
}
interface FindSortAndFilterCoursesProps {
    onSubmitInfo: (data:SortFilterCoursesInputs) => void;
}

const StyledContainer = styled.div`
    margin-bottom: 10px;
    max-height:100px;
    display:flex;
    column-gap: 10px;
    align-items:center;
`;

const SearchContainer = styled.div`
`;

const CategoryContainer = styled.div`
    max-width:20%;
`;
const ApprovedContainer = styled.div`
    display: flex;
    column-gap: 5px;
    align-items:center;
`;

export function FindSortAndFilterCourses(props: FindSortAndFilterCoursesProps) {
    const { onSubmitInfo } = props;
    const {
        register, handleSubmit, setValue, watch,
    } = useForm<SortFilterCoursesInputs>();

    const [isSubmitted, setSubmitted] = useState(false);
    const [isShowSubmit, setShowSubmit] = useState(false);
    const onSelectCategory = (value:CourseCategory) => {
        setValue('categoryId', value.id);
    };

    const watchFields = watch();

    useEffect(() => {
        if (watchFields.search || watchFields.categoryId || watchFields.approved) {
            setShowSubmit(true);
        } else {
            setShowSubmit(false);
        }
    }, [watchFields]);
    const onSubmit = (data:SortFilterCoursesInputs) => {
        setSubmitted(true);
        onSubmitInfo(data);
    };
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            style={{
                marginBottom: '20px',
            }}
        >

            <StyledContainer>
                <SearchContainer>
                    <Input {...register('search')} placeholder="Поиск"></Input>
                </SearchContainer>
                <CategoryContainer>
                    <CategoryAutocomplete {...register('categoryId')} onSelect={onSelectCategory} />
                </CategoryContainer>
                <ApprovedContainer>
                    <Input
                        {...register('approved')}
                        style={{
                            height: '20px',
                            width: '20px',
                        }}
                        label="Подтверждено"
                        checkBox
                        type="checkbox"
                    >
                    </Input>
                </ApprovedContainer>
            </StyledContainer>
            { (isShowSubmit || isSubmitted) && <Button type="submit">Применить</Button>}
        </form>
    );
}
