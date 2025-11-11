import { Input } from "antd";
import { PatternFormat } from "react-number-format";
import type { PatternFormatProps } from "react-number-format";

export const PhoneInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="(##) #####-####"
    customInput={Input}
    placeholder="(00) 00000-0000"
    size="middle"
  />
);

export const CPFInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="###.###.###-##"
    customInput={Input}
    placeholder="000.000.000-00"
    size="middle"
  />
);

export const CNPJInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="##.###.###/####-##"
    customInput={Input}
    placeholder="00.000.000/0000-00"
    size="middle"
  />
);
