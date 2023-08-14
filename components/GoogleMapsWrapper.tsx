import { Wrapper, Status } from "@googlemaps/react-wrapper";

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

  const render = (status: Status) => {
    if (status === Status.LOADING)
      return (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <span>Loading map</span>
          <span className="loading loading-dots loading-md"></span>
        </div>
      );
    if (status === Status.FAILURE)
      return (
        <div className="flex items-center justify-center w-full h-full gap-3">
          <span>Loading Failed</span>
        </div>
      );
    return <>{children}</>;
  };

  return <Wrapper apiKey={apiKey} render={render} />;
};
