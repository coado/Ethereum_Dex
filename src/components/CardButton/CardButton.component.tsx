import { DefaultButton } from '../Buttons/Buttons.component';

interface ICardButton {
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
    text: string;
    disabled?: boolean;
    buttonWidth?: number;
    margin?: string;
}

export const CardButton: React.FunctionComponent<ICardButton> = ({ onClick, text, disabled, buttonWidth, margin }) => (
    <DefaultButton margin={margin} buttonWidth={buttonWidth} disabled={disabled} onClick={onClick}> {text.toUpperCase()} </DefaultButton>
);