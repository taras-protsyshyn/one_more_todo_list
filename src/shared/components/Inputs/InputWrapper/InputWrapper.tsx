import "./inputWrapper.css";

type InputWrapperProps = {
  children: React.ReactNode;
  error?: string;
  className?: string;
};

export const InputWrapper = ({ children, error, className }: InputWrapperProps) => {
  return (
    <span className={`inputWrapper${error ? " inputError" : ""} ${className || ""}`}>
      {children}
      <span className="errorMessage">{error}</span>
    </span>
  );
};
