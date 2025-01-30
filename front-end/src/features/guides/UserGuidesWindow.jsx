import Modal from "../../ui/Modal";
import Button from "../../ui/Button";
import GuideAddEditForm from "./GuideAddEditForm";
import GuideList from "./GuideList";
import useGuides from "../../hooks/useGuides";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
function UserGuidesWindow() {
  const { guides } = useGuides();
  const owner = guides?.[0]?.owner?.username;
  const { userId: ownerId } = useParams();
  const { id: userId } = useSelector((store) => store.user);

  return (
    <div className="w-full rounded-lg border-2 p-4">
      <div className="flex justify-between border-b border-dotted pb-2 ">
        <h1 className="mb-4 mt-2 text-xl font-bold">{owner} guides</h1>
        {ownerId === userId && (
          <div>
            <Modal>
              <Modal.Open opens="create">
                <div>
                  <Button>CREATE NEW GUIDE</Button>
                </div>
              </Modal.Open>
              <Modal.Window name="create">
                <GuideAddEditForm />
              </Modal.Window>
            </Modal>
          </div>
        )}
      </div>
      {guides?.length > 0 ? (
        <GuideList guides={guides} />
      ) : (
        <p className="mt-2  font-semibold">
          No guides available.{" "}
          {ownerId === userId && "Start by creating a new guide!"}
        </p>
      )}
    </div>
  );
}

export default UserGuidesWindow;
