import React, { FC } from "react";
import { ButtonPropsType } from "$types/common";

const Button: FC<ButtonPropsType> = props => {
    const { onClick, className, children } = props;

    const handleClick = () => onClick();

    return (
        <span onClick={handleClick} className={className}>
            {children}
        </span>
    );
}

export default Button;
