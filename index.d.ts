interface ThermocoupleOptions {
  type: "b" | "e" | "j" | "k" | "n" | "r" | "s" | "t";
  input: "mv" | "degc";
}

interface ThermocoupleConverter {
  to_type_b(degc: number): number;
  from_type_b(mv: number): number;
  to_type_e(degc: number): number;
  from_type_e(mv: number): number;
  to_type_j(degc: number): number;
  from_type_j(mv: number): number;
  to_type_k(degc: number): number;
  from_type_k(mv: number): number;
  to_type_n(degc: number): number;
  from_type_n(mv: number): number;
  to_type_r(degc: number): number;
  from_type_r(mv: number): number;
  to_type_s(degc: number): number;
  from_type_s(mv: number): number;
  to_type_t(degc: number): number;
  from_type_t(mv: number): number;
}

interface Thermocouple {
  range: Record<
    string,
    { t: { min: number; max: number }; v: { min: number; max: number } }
  >;
  supported_types: string[];
  converter: ThermocoupleConverter;
  convert(input: number, opts: ThermocoupleOptions): number;
}

declare const Thermocouple: Thermocouple;

export = Thermocouple;
