import styled  from "styled-components";
import { ReactComponent as Arrow} from '../../svg/arrow.svg';
import { ReactComponent as Settings} from '../../svg/settings.svg';

export const Card = styled.div`
  width: 25rem;
  // height: 32rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1rem;
  transition: all 0.5s;
`

export const CardHeader = styled.div`
    display: flex;
    align-items: center;
    width: 80%;
    justify-content: space-between;
    margin-top: 1rem;

    h1 {
      font-size: 1.5rem;
      letter-spacing: 0.2rem;
      color: #12eba7;
      margin-left: 4rem;
    }
`

export const SettingsSign = styled(Settings)`
  width: 1rem;
  height: 1rem;
  transition: all 0.3s;
`

export const SettingsIconContainer = styled.div`
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #12eba7;
    opacity: 0.6;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      opacity: 1;
      transform: scale(1.03);
    }

    &:hover ${SettingsSign} {
      transform: rotate(180deg);
    }
`

export const CurrencyWrapper = styled.div`
    width: 80%;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 1rem;
    display: flex;
    align-items: center;
`

export const SelectedToken = styled.div`
    width: 8.5rem;
    height: 3rem;
    border-radius: 0.5rem;
    cursor: pointer;
    right: 2rem;
    top: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: space-between;

    h2 {
      font-size: 0.8rem;
      margin-left: 0.5rem;
      color: #12eba7;
    }
`

export const Alert = styled.div`
    width: 80%;
    height: 10rem;
    border: 1px solid #12eba7;
    border-radius: 1rem;
    margin-bottom: 1rem;
    text-align: center;

    h1 {
      color: #12eba7;
      font-size: 1.1rem;
    }

    p {
      color: #12eba7;
      font-size: 0.9rem;
      padding: 0.5rem;
    }
`

export const ImageWrapper = styled.div`
    display: flex;
    align-items: center;
    margin-right: 1rem;
`

export const Icon = styled.img`
    width: 1.6rem;
    height: 1.6rem;
    margin-left: 1rem;
`

export const Dash = styled.span`
    margin-left: 1.5rem;
    color: #12eba7;
`

export const SelectSign = styled.span`
    transform: rotate(90deg);
    margin-right: 1rem;
    color: #12eba7;
    transition: all 0.2s;
`

export const Balance = styled.div`
    display: flex;
    align-items: center;
    align-self: flex-end;
    margin-right: 3rem;

    p {
      color: grey;
      font-size: 0.8rem;
    }

    span {
      color: black;
      font-size: 0.8rem;
      margin-right: 1rem;
      padding: 0.2rem 0.8rem;
      background-color: #12eba7;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.2s;

      &:hover {
        box-shadow: 0 0 5px #12eba7, 0 0 50px #12eba7, 0 0 100px #12eba7,
          0 0 200px #12eba7;
      }
    }
`

export const AddSign = styled.div`
    display: flex;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(18, 235, 167, 0.8);
    border-radius: 3rem;
    margin-left: 2.5rem;
    transform: translateY(-1.5rem);
    transition: all 0.2s;
`


interface IArrowSign {
  rotate?: number; 
}

export const ArrowSign = styled(Arrow)<IArrowSign>`
  width: 1rem;
  height: 1rem;
  transition: all 0.2s;
  transform: rotate(${props => props.rotate}deg);
`

export const ChangeTokens = styled.div`
    display: flex;
    align-self: flex-start;
    align-items: center;
    justify-content: center;
    width: 2.5rem;
    height: 2.5rem;
    background-color: rgba(18, 235, 167, 0.6);
    border-radius: 3rem;
    margin-left: 2.5rem;
    transform: translateY(-1.5rem);
    transition: all 0.2s;
    cursor: pointer;

    &:hover {
      background-color: rgba(255, 255, 255, 0.8);
    }

    &:hover ${ArrowSign} {
      &.left {
        transform: translateY(0.2rem) rotate(90deg);
      }

      &.rigth {
        transform: translateY(-0.2rem) rotate(-90deg);
      }
    }
`

export const PoolStats = styled.div`
  margin: 1rem 0;
  width: 80%;
  height: 5rem;
  border: 1px solid rgba(18, 235, 167);
  border-radius: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    text-align: center;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: .5rem;
  }

  h2 {
    font-size: 0.7rem;
    color: rgba(18, 235, 167);
  }
` 

export const ApproveWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`

export const ApproveText = styled.h2`
  color: rgba(18, 235, 167);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
`

export const ApproveButtons = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-around;
`

export const Footer = styled.div`
  width: 88%;
  display: flex;
  justify-content: center;
  margin-top: 1rem;
`

// base color rgba(18, 235, 167, 0.8)