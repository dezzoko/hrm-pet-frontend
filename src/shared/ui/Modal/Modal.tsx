import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
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

const StyledWrapper = styled.div`
    padding:20px;
    position:fixed;
    display:flex;
    justify-content:center;
    align-items:center;
    width: 100vh;
    border-radius: 20px;
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
        <Transition
            show={isOpen}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-95 opacity-0"
            enterTo="transform scale-100 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-100 opacity-100"
            leaveTo="transform scale-95 opacity-0"
            as={Fragment}
        >

            <StyledDialog open={isOpen} onClose={setClose}>
                <BackDrop aria-hidden="true">
                    <StyledWrapper>
                        <Dialog.Panel>
                            <div style={{
                                background: 'white',
                                padding: '20px',
                                borderRadius: '15px',
                            }}
                            >

                                {children}
                            </div>
                        </Dialog.Panel>
                    </StyledWrapper>

                </BackDrop>
            </StyledDialog>

        </Transition>
    );
}
