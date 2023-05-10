export type WifiForm = {
  enable: boolean;
  ssid: string;
  password: string;
  dhcp: {
    enable: boolean;
    ip: string;
    mask: string;
    gateway: string;
    dns0: string;
    dns1: string;
  };
};
