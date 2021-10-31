import { DefaultButton } from '../Buttons/Buttons.component';

interface ICardButton {
    onClick?: () => void;
    text: string;
    disabled?: boolean;
    buttonWidth?: number;
}

export const CardButton: React.FunctionComponent<ICardButton> = ({ onClick, text, disabled, buttonWidth }) => (
    <DefaultButton buttonWidth={buttonWidth} className={`${disabled ? 'disabled' : null}`} disabled={disabled} onClick={onClick}> {text.toUpperCase()} </DefaultButton>
);