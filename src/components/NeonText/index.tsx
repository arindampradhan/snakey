import type { ReactNode } from "react";
import "./neon.css";

// Add prop types for size and children
type NeonTextProps = {
  size?: string;
  children: ReactNode;
};

export default function NeonText(props: NeonTextProps) {
  return (
    <div className="neon-container">
      <div className="wire"></div>
      <h1 className={`neon-text ${props.size}`}>{props.children}</h1>
      <div className="wire"></div>
    </div>
  );
}
