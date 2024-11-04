import { Button as ButtonProps } from "../../types/types";

const Button = ({ label, onClick, className, isDisabled }: ButtonProps) => {
  return (
      <button
          onClick={isDisabled ? undefined : onClick}
          className={`${className} ${
              isDisabled ? 'cursor-not-allowed opacity-50' : ''
          }`}
      >
          {label}
      </button>
  );
};
  
  export default Button;