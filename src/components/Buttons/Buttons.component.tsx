import styled from 'styled-components';

interface IBtn {
  buttonWidth?: number;
  backgroundColor?: string | null;
  margin?: string;
}

const Button = styled.button<IBtn>`
  border: none;
  cursor: pointer;
  font-family: 'Baloo 2', cursive;
  margin: ${props => props.margin};
  width: ${props => props.buttonWidth || 20}rem;
`

export const DefaultButton = styled(Button)`
    color: black;
    background: #12eba7;
    padding: 0.8rem 0;
    opacity: 0.8;
    border-radius: 0.5rem;
    letter-spacing: 0.1rem;
    transition: all 0.2s;

    &:disabled {
    background: #afafaf;
    opacity: 1;
    cursor: default;
  }

  &:hover {
    opacity: 1;
  }

`

export const ReflectButton = styled(Button)`
  font-size: 1rem;
  background: #12eba7;
  border-radius: 0.5rem;
  padding: 0.4rem 1.5rem;
  color: rgb(27, 25, 25);
  box-shadow: 0 0 5px #12eba7, 0 0 20px #12eba7, 0 0 40px #12eba7,
    0 0 1000px #12eba7;
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  transition: all 0.2s;

  &:hover {
    box-shadow: 0 0 20px #12eba7, 0 0 65px #12eba7, 0 0 100px #12eba7,
      0 0 400px #12eba7;
  }

  a {
    text-decoration: none;
    color: rgb(27, 25, 25);
  }
`

export const SlippageButton = styled(Button)`
  padding: 0.2rem 0.5rem;
  border: 2px solid #12eba7;
  border-radius: 1rem;
  font-size: 1rem;
  color: ${ props => props.backgroundColor ? '#000000' : '#538978'};
  background-color: ${props => props.backgroundColor || 'transparent'};
  -webkit-box-reflect: below 1px linear-gradient(transparent, #0005);
  box-shadow: ${props => props.backgroundColor ? `0 0 5px ${props.backgroundColor}, 0 0 20px ${props.backgroundColor}, 0 0 40px ${props.backgroundColor},0 0 1000px ${props.backgroundColor}` : null};
  transition: all .2s;

  &:hover {
    background: ${props => props.backgroundColor ? null : 'rgba(255, 255, 255, .1)'};
  }
`
