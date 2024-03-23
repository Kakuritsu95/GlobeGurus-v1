import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUserId } from "../../redux/slices/userSlice";
import Modal from "../../ui/Modal";
import useGuide from "../../hooks/useGuide";
import Dropdown from "../../ui/Dropdown";
import AccordionText from "../../ui/AccordionText";
import DropdownItem from "../../ui/DropdownItem";
import GuideAddEditForm from "./GuideAddEditForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { RxDotsVertical } from "react-icons/rx";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin2Line } from "react-icons/ri";
function GuideOverview({ showMap }) {
  const { data } = useGuide();
  const guide = data || {};
  const userId = useSelector(getUserId);
  const isEditSession = userId === guide?.owner?._id;

  const { title, description, territory, imageUrl, _id: guideId } = guide;

  if (guide.title)
    return (
      <div
        className={`col-span-full mt-3 ${showMap ? "hidden" : "grid"} overflow-auto  sm:overflow-hidden lg:col-span-2 lg:grid xl:col-span-1 xl:row-span-full xl:row-start-1`}
      >
        <div className="relative flex flex-col px-5 py-3 text-sm sm:mt-3 sm:h-full sm:space-y-5 sm:py-5 md:text-base lg:px-7 xl:py-1">
          <div className="mx-auto gap-5 sm:mx-0 sm:flex sm:items-center xl:flex-col xl:items-start">
            <div className="sm:order-2 sm:w-1/2 xl:w-full">
              <h4 className="text-lg font-bold sm:text-lg md:text-xl 2xl:text-xl">
                {title}
              </h4>

              <Link className="underline">{`by ${guide.owner.username}`}</Link>

              {isEditSession && (
                <Modal>
                  <Dropdown absolute={true}>
                    <Dropdown.Toggle>
                      <RxDotsVertical className="absolute right-3 top-4 text-xl md:right-3 md:top-1 md:text-2xl" />
                    </Dropdown.Toggle>
                    <Dropdown.List
                      size="small"
                      position="top-10 right-3 sm:top-9 right-4"
                    >
                      <Modal.Open opens="edit">
                        <button>
                          <DropdownItem>
                            <span>Edit</span>
                            <BiEdit size={22} />
                          </DropdownItem>
                        </button>
                      </Modal.Open>
                      <Modal.Open opens="delete">
                        <button>
                          <DropdownItem>
                            <span>Delete</span>
                            <RiDeleteBin2Line size={22} />
                          </DropdownItem>
                        </button>
                      </Modal.Open>
                    </Dropdown.List>
                  </Dropdown>
                  <Modal.Window adjustPosition="-top-12" name="edit">
                    <GuideAddEditForm
                      guideToEdit={{
                        title,
                        description,
                        territory,
                        imageUrl,
                        guideId,
                      }}
                    />
                  </Modal.Window>
                  <Modal.Window adjustPosition="-top-44" name="delete">
                    <ConfirmDelete />
                  </Modal.Window>
                </Modal>
              )}
              <div>
                <span className="font-thin">{`Locations: ${data.places.length}`}</span>
              </div>
            </div>
            <div className="relative max-w-72 sm:w-full lg:max-w-full xl:order-2">
              <img src={imageUrl} className="rounded-l" />
              <h4 className="absolute left-3 top-1 text-xl  font-semibold text-white sm:text-lg">
                {territory}
              </h4>
            </div>
          </div>
          <div className="mt-2 text-center sm:text-start">
            <div className="font-semibold sm:text-base">About </div>
            <AccordionText>{description}</AccordionText>
          </div>
        </div>
      </div>
    );
}

export default GuideOverview;
