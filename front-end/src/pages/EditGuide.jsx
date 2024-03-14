import Map from "../features/map/Map";
import GuideWindow from "../features/guides/GuideWindow";
import Modal from "../ui/Modal";
import Tab from "../ui/Tab";
import NearbyPlaces from "../features/places/NearbyPlaces";
import AddPlaceForm from "../features/places/AddPlaceForm";

function EditGuide() {
  return (
    <div className="grid h-dvh grid-cols-5 grid-rows-3">
      <GuideWindow />
      <Modal>
        <Map />
        <Modal.Window>
          <Tab>
            <Tab.Layout>
              <Tab.Content>
                <AddPlaceForm />
                <NearbyPlaces />
              </Tab.Content>
            </Tab.Layout>
          </Tab>
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default EditGuide;
