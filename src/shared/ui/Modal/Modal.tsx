import React from 'react';
import { Dialog } from '@headlessui/react';
import styled from 'styled-components';

export interface ModalProps{
    children:React.ReactNode;
    isOpen:boolean;
    setClose:()=>void;
}

const StyledDialog = styled(Dialog)`
        position:relative;
        z-index:99999;
        padding:20px;
`;

const StyledWrapperModal = styled.div`
background-color: ${({ theme }) => theme.bgColors.primaryColor};
padding: 20px;
border-radius: 15px;

`;

const BackDrop = styled.div`
    position: fixed;

    top: 0;
    left: 0;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
`;
export function Modal(props:ModalProps) {
    const {
        children, isOpen, setClose,
    } = props;
    return (
        <StyledDialog open={isOpen} onClose={setClose}>
            <BackDrop aria-hidden="true">
                <Dialog.Panel>
                    <StyledWrapperModal>

                        {children}
                    </StyledWrapperModal>
                </Dialog.Panel>

            </BackDrop>
        </StyledDialog>

    );
}
