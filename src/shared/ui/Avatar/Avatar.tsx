import styled from 'styled-components';

interface AvatarProps {
    src:string;
}

const StyledAvatar = styled.div<{src:string}>`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-image: url(${({ src }) => src});
    background-size: cover;
    background-position: center;
`;
export function Avatar(props: AvatarProps) {
    const { src } = props;
    return (
        <StyledAvatar src={src} />
    );
}
