import CreateGuideForm from "../features/guides/CreateGuideForm";
import Modal from "../ui/Modal";

function UserGuides() {
  return (
    <div>
      <Modal>
        <h3>You dont have any guides yet!</h3>
        <Modal.Open>
          <button className="bg-blue-200 p-2">Create Guide</button>
        </Modal.Open>
        <Modal.Window>
          <CreateGuideForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UserGuides;
