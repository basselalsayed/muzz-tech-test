export const Button: React.FC<React.ComponentPropsWithRef<'button'>> = (
  props
) => (
  <button
    {...props}
    className={`cursor-pointer rounded-lg border-0 bg-[#e8506e] px-2.5 py-1.5 font-semibold text-white transition-colors duration-200 ease-in-out hover:bg-[#cc3d59] ${
      props.disabled ? 'cursor-not-allowed opacity-50 hover:bg-[#e8506e]' : ''
    }`}
  />
);
