type RadiusMarkerProps = {
  radius: number;
};

const RadiusMarker = (props: RadiusMarkerProps) => {
  const { radius } = props;

  return (
    <div
      className={`cursor-pointer aspect-square w-[${radius}] object-center rounded-full border-4 bg-base-content bg-opacity-10 border-opacity-80`}
    ></div>
  );
};

export default RadiusMarker;

const CustomCircle = function (
  this: any,
  center: { lat: number; lng: number },
  radius: number,
  map: google.maps.Map
) {
  //Calculate the bounds with the Circle API
  this.bounds_ = new google.maps.Circle({
    center: center,
    radius: radius,
  }).getBounds();
  this.map_ = map;
  this.div_ = null;
  this.setMap(map);
};

CustomCircle.prototype = new google.maps.OverlayView();
CustomCircle.prototype.onAdd = function (this: any) {
  var div = document.createElement("div");
  div.style.position = "absolute";

  var circle = document.createElement("div");
  circle.className = "circle"; //class with custom styling
  circle.style.width = "100%";
  circle.style.height = "100%";
  circle.style.position = "absolute";
  div.appendChild(circle);

  this.div_ = div;
  var panes = this.getPanes();
  panes.overlayLayer.appendChild(div);
};
CustomCircle.prototype.draw = function (this: any) {
  var overlayProjection = this.getProjection();
  var sw = overlayProjection.fromLatLngToDivPixel(this.bounds_.getSouthWest());
  var ne = overlayProjection.fromLatLngToDivPixel(this.bounds_.getNorthEast());
  var div = this.div_;
  div.style.left = sw.x + "px";
  div.style.top = ne.y + "px";
  div.style.width = ne.x - sw.x + "px";
  div.style.height = sw.y - ne.y + "px";
};
CustomCircle.prototype.onRemove = function (this: any) {
  this.div_.parentNode.removeChild(this.div_);
  this.div_ = null;
};
