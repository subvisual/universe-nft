import { FC } from "react";

interface Props {
  uri: string;
  size: number;
}

export const Cell: FC<Props> = ({ uri, size }) => {
  return <img style={{ width: size, height: size }} src={uri} />;
};
