import { InputWrapper } from "../InputWrapper/InputWrapper";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
  wrapperClassName?: string;
};

export const Input = ({ error, wrapperClassName, ...rest }: InputProps) => {
  return (
    <InputWrapper error={error} className={wrapperClassName}>
      <input {...rest} />
    </InputWrapper>
  );
};
