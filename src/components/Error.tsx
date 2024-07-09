import { ErrorComponentProps } from "@tanstack/react-router";

export default function Error({ error }: ErrorComponentProps) {
  return <div>Error: {error.message}</div>;
}
