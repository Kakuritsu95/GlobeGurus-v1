import { useNavigate, useParams } from "react-router-dom";
import { getUserCoordinates } from "../helpers/getUserCoordinates";
import Button from "./Button";

function PopularNearbyPanel() {
  const navigate = useNavigate();

  const { service } = useParams();
  async function navigateToNearbyCoords() {
    const { latitude, longitude } = await getUserCoordinates;

    navigate(`nearby?lat=${latitude}&lng=${longitude}&page=1`);
  }
  async function navigateToPopular() {
    navigate("popular?page=1");
  }
  return (
    <div className="mx-auto flex w-2/3 gap-2 ">
      <Button
        type={service === "popular" ? "panelEnabled" : "panelDisabled"}
        handleClick={navigateToPopular}
        className="rounded bg-blue-200"
      >
        Show popular
      </Button>
      <Button
        type={service === "nearby" ? "panelEnabled" : "panelDisabled"}
        handleClick={navigateToNearbyCoords}
      >
        Show Nearby
      </Button>
    </div>
  );
}

export default PopularNearbyPanel;
