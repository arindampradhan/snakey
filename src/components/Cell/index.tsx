import "./cell.css";

interface CellProps {
  type: "snake" | "food" | "empty";
}

export default function Cell(props: CellProps) {
  return (
    <div
      className={`cell ${props.type === "snake" ? "snake" : ""} ${
        props.type === "food" ? "food" : ""
      }`}
    />
  );
}
