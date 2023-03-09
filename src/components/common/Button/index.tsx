/** @jsxImportSource @emotion/react */
import React from "react";
import { buttonStyles } from "../../../styles/components/Button";

interface ButtonProps {
  className?: string;
  children: React.ReactNode;
}

const BasicButton: React.FC<ButtonProps> = ({
  className,
  children,
  ...rest
}) => {
  return (
    <>
      <button {...rest} css={buttonStyles} className={`${className || ""}`}>
        {children}
      </button>
    </>
  );
};

export default BasicButton;
