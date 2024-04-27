import styled from 'styled-components';
import { Button } from '../Button/Button.styles';

interface PaginationBarProps {
    totalPages?: number;
    currentPage?: number;
    onPageChange: (page: number) => void;
}

const PaginationContainer = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;
`;

const PageNumber = styled(Button)<{ active?: boolean }>`
    height:40px;    
    width:40px;
    padding: 5px 10px;
    margin: 0 5px;
    border: 1px solid #ccc;
    ${({ active, theme }) => active
        && `
        background-color: ${theme.bgColors.secondaryColor};
        color: #fff;
        border-color: ${theme.colors.logoColor};
    `}
`;

export function PaginationBar({
    totalPages,
    currentPage,
    onPageChange,
}: PaginationBarProps) {
    const pageNumbers = [];
    const maxDisplayPages = 10;

    if (currentPage === undefined || totalPages === undefined) {
        return null;
    }

    if (totalPages <= maxDisplayPages) {
        // eslint-disable-next-line no-plusplus
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
    } else {
        let startPage = Math.max(1, currentPage - Math.floor(maxDisplayPages / 2));
        const endPage = Math.min(totalPages, startPage + maxDisplayPages - 1);

        if (endPage - startPage < maxDisplayPages - 1) {
            startPage = Math.max(1, endPage - maxDisplayPages + 1);
        }

        // eslint-disable-next-line no-plusplus
        for (let i = startPage; i <= endPage; i++) {
            pageNumbers.push(i);
        }
    }

    const handlePageChange = (page: number) => {
        if (page !== currentPage) {
            onPageChange(page);
        }
    };

    return (
        <PaginationContainer>
            {currentPage > 1 && !pageNumbers.includes(1) && (
                <PageNumber onClick={() => handlePageChange(1)}>1</PageNumber>
            )}
            {currentPage > 4 && totalPages > maxDisplayPages && !pageNumbers.includes(2) && (
                <span>...</span>
            )}
            {pageNumbers.map((page) => (
                <PageNumber
                    key={page}
                    onClick={() => handlePageChange(page)}
                    active={currentPage === page}
                >
                    {page}
                </PageNumber>
            ))}
            {currentPage < totalPages - 3 && totalPages > maxDisplayPages && !pageNumbers.includes(totalPages - 1) && (
                <span>...</span>
            )}
            {currentPage < totalPages && !pageNumbers.includes(totalPages) && (
                <PageNumber onClick={() => handlePageChange(totalPages)} active={currentPage === totalPages}>
                    {totalPages}
                </PageNumber>
            )}
        </PaginationContainer>
    );
}
