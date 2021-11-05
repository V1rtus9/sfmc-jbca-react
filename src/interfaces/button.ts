export type Button = 'next' | 'back';
export type ButtonText = 'next' | 'done';

export interface IButton {
    button: Button;
    text?: ButtonText;
    visible?: boolean;
    enabled?: boolean;
}