import { Button as ButtonProps } from "../../types/types";

function Button({ label, onClick, className = '' }: ButtonProps) {
    return (
      <button
        className={`px-4 py-2 bg-blue-500 text-white rounded ${className}`}
        onClick={onClick}
      >
        {label}
      </button>
    );
  }
  
  export default Button;