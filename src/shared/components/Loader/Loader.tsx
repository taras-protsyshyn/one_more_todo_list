import { SpinnerIcon } from "../Icons";
import "./loader.css";

type LoaderProps = {
  children?: React.ReactNode;
  loading?: boolean;
  hideChildren?: boolean; // Optional prop to hide children when loading
  style?: React.CSSProperties;
};

export const Loader = ({ children, loading, hideChildren = false, style }: LoaderProps) => {
  return (
    <div style={style} className={`loader ${loading ? "show" : ""} `}>
      {!hideChildren && children}
      {loading && <SpinnerIcon className="spinner" />}
    </div>
  );
};
