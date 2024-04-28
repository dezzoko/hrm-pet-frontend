import { useEffect } from 'react';

export function useOutsideClick(ref: React.RefObject<HTMLElement>, handleClickOutside:()=>void) {
    useEffect(() => {
        function handleClickOutsideHandler(event: any) {
            if (ref.current && !ref.current.contains(event.target)) {
                handleClickOutside();
            }
        }
        document.addEventListener('mousedown', handleClickOutsideHandler);
        return () => {
            document.removeEventListener('mousedown', handleClickOutsideHandler);
        };
    }, [handleClickOutside, ref]);
}
