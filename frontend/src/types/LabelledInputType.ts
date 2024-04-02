import { ChangeEvent } from "react";

export interface LabelledInputType {
  type?: string;
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
