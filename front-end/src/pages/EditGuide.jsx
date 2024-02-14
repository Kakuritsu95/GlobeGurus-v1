import Map from "../features/guides/Map";
import GuideWindow from "../features/guides/GuideWindow";
import CreateGuideForm from "../features/guides/CreateGuideForm";

function EditGuide() {
  return (
    <div className="grid h-dvh grid-cols-5 grid-rows-3  ">
      <GuideWindow />
      <Map />
    </div>
  );
}

export default EditGuide;
