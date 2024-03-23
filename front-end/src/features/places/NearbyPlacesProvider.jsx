import { createContext, useContext, useReducer, useRef } from "react";
const NearbyPlacesContext = createContext();
const initialState = {
  nearbyPlaces: [],
  selectedPlace: {},
};
function placesReducer(state, action) {
  switch (action.type) {
    case "nearbyPlaces/update":
      return { ...state, nearbyPlaces: action.payload };
    case "nearbyPlaces/select":
      return { ...state, selectedPlace: action.payload };
    case "nearbyPlaces/deselect":
      return { ...state, selectedPlace: {} };
    case "nearbyPlaces/loading":
      return { ...state, status: "loading" };
    case "nearbyPlaces/idle":
      return { ...state, status: "idle" };

    case "nearbyPlaces/reset":
      return initialState;
    default:
      return state;
  }
}
function NearbyPlacesProvider({ children }) {
  const clickedCoords = useRef({ coords: "" });

  function updateNearbyPlaces(places) {
    dispatch({ type: "nearbyPlaces/update", payload: places });
  }
  function selectNearbyPlace(place) {
    dispatch({ type: "nearbyPlaces/select", payload: place });
  }
  function deselectNearbyPlace() {
    dispatch({ type: "nearbyPlaces/deselect" });
  }
  const [{ nearbyPlaces, selectedPlace }, dispatch] = useReducer(
    placesReducer,
    initialState,
  );

  return (
    <NearbyPlacesContext.Provider
      value={{
        clickedCoords,
        nearbyPlaces,
        selectedPlace,
        updateNearbyPlaces,
        selectNearbyPlace,
        deselectNearbyPlace,
      }}
    >
      {children}
    </NearbyPlacesContext.Provider>
  );
}

export function useNearbyPlaces() {
  const context = useContext(NearbyPlacesContext);
  if (!context)
    throw new Error("Cannot access NeabyPlacesContext outside of its provider");
  return context;
}
export default NearbyPlacesProvider;
