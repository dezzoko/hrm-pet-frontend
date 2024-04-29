import { forwardRef } from 'react';
import { useLazyFindCoursesCategoriesQuery } from '@/entities/CourseCategory';
import { CourseCategory } from '@/entities/CourseCategory/model/types/courseCategory';
import { Autocomplete } from '@/shared/ui';

interface CategoryAutocompleteProps {
    onSelect: (value: CourseCategory) => void;
    selectedCategory?:CourseCategory;
}
export const CategoryAutocomplete = forwardRef<HTMLInputElement, CategoryAutocompleteProps>((props, ref) => {
    const { onSelect, selectedCategory } = props;
    const [search, { data }] = useLazyFindCoursesCategoriesQuery();

    return (
        <Autocomplete
            ref={ref}
            onSelect={onSelect}
            search={search}
            searchResults={data || []}
            selectedValue={selectedCategory && selectedCategory}
            placeholder="Категория"
        />
    );
});