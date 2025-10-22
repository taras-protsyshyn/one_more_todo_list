import { InputWrapper } from "../InputWrapper/InputWrapper";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  error?: string;
  wrapperClassName?: string;
};

export const Textarea = ({ error, wrapperClassName, ...rest }: TextareaProps) => {
  return (
    <InputWrapper error={error} className={wrapperClassName}>
      <textarea {...rest} />
    </InputWrapper>
  );
};
