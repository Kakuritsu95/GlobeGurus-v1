import GuideAddEditForm from "../features/guides/GuideAddEditForm";
import Modal from "../ui/Modal";

function UserGuides() {
  return (
    <div>
      <Modal>
        <h3>You dont have any guides yet!</h3>
        <Modal.Open opens="form">
          <button className="bg-blue-200 p-2">Create Guide</button>
        </Modal.Open>
        <Modal.Window adjustPosition="-top-12" name="form">
          <GuideAddEditForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default UserGuides;
