import './button.styles.scss';

const MyButton = ({btnText, ...otherProps}) => {
    return (
        <button {...otherProps}>{btnText}</button>
    );
}

export default MyButton;