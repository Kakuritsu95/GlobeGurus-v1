import NearbyPlacesProvider from "../features/places/NearbyPlacesProvider";
import GuideWindow from "../features/guides/GuideWindow";
import Modal from "../ui/Modal";
import Tab from "../ui/Tab";
import NearbyPlaces from "../features/places/NearbyPlaces";
import PlaceAddEditForm from "../features/places/PlaceAddEditForm";
function EditGuide({ isEditSession }) {
  return isEditSession ? (
    <Modal>
      <NearbyPlacesProvider>
        <GuideWindow />
        <Modal.Window adjustPosition="-top-12" name="place tab">
          <Tab>
            <Tab.Layout>
              <Tab.Content>
                <NearbyPlaces />
                <PlaceAddEditForm />
              </Tab.Content>
            </Tab.Layout>
          </Tab>
        </Modal.Window>
      </NearbyPlacesProvider>
    </Modal>
  ) : (
    5
  );
}

export default EditGuide;
