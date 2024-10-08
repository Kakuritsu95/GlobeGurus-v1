import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import GuideAddEditForm from "./GuideAddEditForm";
import GuideList from "./GuideList";
import useGuides from "../../hooks/useGuides";
function UserGuidesWindow() {
  const { guides } = useGuides();
  const owner = guides?.[0]?.owner?.username;

  return (
    <div className="w-full rounded-lg border-2 p-4">
      <div className="flex justify-between border-b border-dotted pb-2 ">
        <h1 className="mb-4 mt-2 text-xl font-bold">{owner} guides</h1>
        <div>
          <Modal>
            <Modal.Open opens="create">
              <div>
                <Button>CREATE NEW GUIDE</Button>
              </div>
            </Modal.Open>
            <Modal.Window name="create" adjustPosition="-top-24">
              <GuideAddEditForm />
            </Modal.Window>
          </Modal>
        </div>
      </div>
      <GuideList />
    </div>
  );
}

export default UserGuidesWindow;
