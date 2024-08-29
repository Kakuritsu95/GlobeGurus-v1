import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
function LazyImage({ imageName }) {
  return (
    <LazyLoadImage
      alt="feature image"
      src={`public/images/${imageName}.jpg`}
      effect="blur"
      style={{ height: 400, width: 700 }}
    />
  );
}

export default LazyImage;
