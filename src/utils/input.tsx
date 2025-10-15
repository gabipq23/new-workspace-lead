import { Input } from "antd";
import { PatternFormat } from "react-number-format";
import type { PatternFormatProps } from "react-number-format";

export const PhoneInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="(##) #####-####"
    customInput={Input}
    placeholder="(XX) XXXXX-XXXX"
    size="middle"
  />
);

export const CPFInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="###.###.###-##"
    customInput={Input}
    placeholder="XXX.XXX.XXX-XX"
    size="middle"
  />
);

export const CNPJInput = (props: PatternFormatProps) => (
  <PatternFormat
    {...props}
    format="##.###.###/####-##"
    customInput={Input}
    placeholder="XX.XXX.XXX/XXXX-XX"
    size="middle"
  />
);
