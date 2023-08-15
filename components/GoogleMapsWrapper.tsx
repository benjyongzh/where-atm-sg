import { Wrapper } from "@googlemaps/react-wrapper";
import { ReactElement } from "react";

export const GoogleMapsWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Ideally we want the apiKey to be fetch from an environment variable
  const apiKey = process.env.NEXT_PUBLIC_GMAPS_API_KEY;

  if (!apiKey) {
    return (
      <div className="flex items-center justify-center w-full h-full gap-3">
        <span>No API key</span>
      </div>
    );
  }

  return (
    <Wrapper apiKey={apiKey} version="beta" libraries={["marker"]}>
      {children}
    </Wrapper>
  );
};
