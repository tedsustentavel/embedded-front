export type SensorForm = {
  temperature: {
    enable: boolean;
    bias: number;
    gain: number;
  };
  laser: {
    enable: boolean;
    addr: string;
    bias: number;
    diameter: number;
    length: number;
  };
};
