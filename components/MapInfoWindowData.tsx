import React from "react";

type InfoWindowProps = {
  title: string;
  address: string;
  info: string;
};

const MapInfoWindowData = (props: InfoWindowProps) => {
  const { title, address, info } = props;
  return (
    <div>
      <p>{title}</p>
      <p>{address}</p>
      <p>{info}m</p>
    </div>
  );
};

export default MapInfoWindowData;
