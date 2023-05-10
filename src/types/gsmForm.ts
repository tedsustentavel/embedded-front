export type GsmForm = {
  enable: boolean;
  apn: string;
  username: string;
  password: string;
  sim800: {
    tx: number;
    rx: number;
    uart: number;
    timeout: number;
    baudrate: number;
  };
  sim7020e: {
    tx: number;
    rx: number;
    uart: number;
    timeout: number;
    baudrate: number;
  };
};
