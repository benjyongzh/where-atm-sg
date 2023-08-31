import { IGeoCode } from "@/features/googleAPI/geocoder";

class CustomCircle extends google.maps.OverlayView {
  bounds_;
  map_;
  div_: HTMLDivElement | null;

  constructor(center: IGeoCode, radius: number, map: google.maps.Map) {
    super();
    // Initialize all properties.
    this.bounds_ = new google.maps.Circle({
      center: center,
      radius: radius,
    }).getBounds()!;
    this.map_ = map!;

    // Define a property to hold the image's div. We'll
    // actually create this div upon receipt of the onAdd()
    // method so we'll leave it null for now.
    this.div_ = null;

    // Explicitly call setMap on this overlay.
    this.setMap(map);
  }

  /**
   * onAdd is called when the map's panes are ready and the overlay has been
   * added to the map.
   */
  onAdd() {
    const div = document.createElement("div");
    div.style.position = "absolute";
    // Create the img element and attach it to the div.
    var circle = document.createElement("div");
    circle.className = "radiusMarker"; //class with custom styling
    circle.style.width = "100%";
    circle.style.height = "100%";
    circle.style.position = "absolute";
    div.appendChild(circle);
    this.div_ = div;
    // Add the element to the "overlayLayer" pane.
    const panes = this.getPanes()!;
    panes.overlayLayer.appendChild(div);
  }
  draw() {
    // We use the south-west and north-east
    // coordinates of the overlay to peg it to the correct position and size.
    // To do this, we need to retrieve the projection from the overlay.
    const overlayProjection = this.getProjection();
    // Retrieve the south-west and north-east coordinates of this overlay
    // in LatLngs and convert them to pixel coordinates.
    // We'll use these coordinates to resize the div.
    const sw = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getSouthWest()
    )!;
    const ne = overlayProjection.fromLatLngToDivPixel(
      this.bounds_.getNorthEast()
    )!;
    // Resize the image's div to fit the indicated dimensions.
    const div = this.div_!;
    div.style.left = sw.x + "px";
    div.style.top = ne.y + "px";
    div.style.width = ne.x - sw.x + "px";
    div.style.height = sw.y - ne.y + "px";
  }
  // The onRemove() method will be called automatically from the API if
  // we ever set the overlay's map property to 'null'.
  onRemove() {
    this.div_!.parentNode!.removeChild(this.div_!);
    this.div_ = null;
  }
}

export default CustomCircle;
