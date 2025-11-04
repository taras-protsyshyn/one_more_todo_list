import { SpinnerIcon } from "../Icons";
import "./loader.css";

type LoaderProps = {
  children?: React.ReactNode;
  loading?: boolean;
  hideChildren?: boolean; // Optional prop to hide children when loading
  style?: React.CSSProperties;
  overlay?: boolean;
};

export const Loader = ({
  children,
  loading,
  hideChildren = false,
  style,
  overlay = true,
}: LoaderProps) => {
  return (
    <div style={style} className={`loader ${loading ? "show" : ""} ${overlay ? "overlay" : ""}`}>
      {hideChildren && loading ? null : children}
      {loading && <SpinnerIcon className="spinner" />}
    </div>
  );
};
