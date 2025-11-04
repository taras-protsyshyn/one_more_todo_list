import { InputWrapper } from "../InputWrapper/InputWrapper";

type TextareaProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  error?: string;
  options: { value: string; label: string }[];
  wrapperClassName?: string;
};

export const Select = ({ error, options, wrapperClassName, ...rest }: TextareaProps) => {
  return (
    <InputWrapper error={error} className={wrapperClassName}>
      <select {...rest}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </InputWrapper>
  );
};
