export type FicharioForm = {
  enable: boolean;
  username: string;
  password: string;
  id: string;
  broker: {
    host: string;
    ssl: boolean;
    qos: number;
    keepon: boolean;
  };
};
