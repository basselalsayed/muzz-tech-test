type ButtonProps = {
  buttonType?: 'submit' | 'reset' | 'button';
  children: string;
  disabled?: boolean;
  onClick?: (...args: any[]) => void;
};

const Button = ({ buttonType, children, disabled, onClick }: ButtonProps) => (
  <button
    type={buttonType}
    className={`cursor-pointer rounded-lg border-0 bg-[#e8506e] px-2.5 py-1.5 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-[#cc3d59] ${
      disabled ? 'cursor-not-allowed opacity-50 hover:bg-[#e8506e]' : ''
    }`}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </button>
);

export default Button;
