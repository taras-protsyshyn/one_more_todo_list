import { Loader } from "../";

import "./button.css";

type ButtonProps = {
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  className?: string;
  loading?: boolean;
};

export const Button = ({ children, loading, disabled, ...props }: ButtonProps) => {
  return (
    <button disabled={loading || disabled} {...props}>
      <Loader overlay={false} hideChildren loading={loading}>
        {children}
      </Loader>
    </button>
  );
};
