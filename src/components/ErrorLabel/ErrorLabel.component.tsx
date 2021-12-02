import styled, { keyframes } from 'styled-components';


const showAnimation = keyframes`
    0% {
        transform: translateX(-20rem)
    } 100% {
        transform: translateX(0rem)
    }
`


const Container = styled.div`
    width: 20rem;
    height: 8rem;
    position: absolute;
    bottom: 2rem;
    left: 1rem;
    border-radius: .5rem;
    border: 1px solid #12eba7;
    box-shadow: 1px 1px 57px #12eba7;
    animation: ${showAnimation} .2s linear;
    display: flex;

    .left {
        width: 60%;
        border-radius: 1rem 0 0 1rem;
        text-align: center;
        color: #12eba7;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: .5rem;
    }

    .right {
        width: 40%;
        background-color: #12eba7;
        border-radius: 0 .5rem .5rem 0;
        display: flex;
        align-items: center;
        justify-content: center;

        img {
            width: 6rem;
            height: 6rem;
        }
    }

`


interface IErrorLabel {
    message: string;
}

export const ErrorLabel: React.FC<IErrorLabel> = ({ message }) => (
    <Container>
        <div className='left'>
            { message }  
        </div>
        <div className='right'>
            <img src='../images/danger.png' alt='error' />
        </div>
    </Container>
);