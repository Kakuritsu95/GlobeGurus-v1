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
import ImageTitleLayout from "../../ui/ImageTitleLayout";
function GuideOverview() {
  const { data } = useGuide();
  const guide = data || {};
  const userId = useSelector(getUserId);
  const isEditSession = userId === guide?.owner?._id;
  const { showMapOnSmallScreens } = useSelector((store) => store.map);
  const { title, description, territory, imageUrl, _id: guideId } = guide;

  if (guide.title)
    return (
      <div
        className={`col-span-full ${showMapOnSmallScreens ? "hidden" : "grid"} relative overflow-y-scroll lg:col-span-2 lg:grid xl:col-span-1 xl:row-span-full xl:row-start-1 xl:overflow-y-hidden`}
      >
        <div className="relative flex flex-col px-5 py-3 text-sm sm:mt-3 sm:h-full sm:space-y-5 sm:py-5 md:text-base lg:px-7 xl:py-1">
          <div className="mx-auto gap-5 sm:mx-0 sm:flex sm:items-center xl:flex-col xl:items-start">
            <div className="sm:order-2 sm:w-1/2 xl:w-full">
              <h2 className="text-lg font-bold sm:text-lg md:text-xl 2xl:text-xl">
                {title}
              </h2>

              <Link className="underline">{`by ${guide.owner.username}`}</Link>
              <div>
                <span className="font-thin">{`Locations: ${data.places.length}`}</span>
              </div>
            </div>
            <div className="relative max-w-72 sm:w-full lg:max-w-full xl:order-2">
              <img src={imageUrl} className="rounded-l" />
              <ImageTitleLayout className="absolute right-0 top-0 h-full w-full shadow-inner-2xl">
                {territory}
              </ImageTitleLayout>
            </div>
          </div>
          <div className="mt-2 text-center sm:text-start">
            <div className="font-semibold sm:text-base">About </div>
            <AccordionText>{description}</AccordionText>
          </div>
        </div>

        {isEditSession && (
          <Modal>
            <Dropdown absolute={true}>
              <Dropdown.Toggle>
                <RxDotsVertical className="absolute right-3 top-4 z-50 text-xl md:right-1 md:top-3 md:text-2xl" />
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
            <Modal.Window adjustPosition="-top-36" name="delete">
              <ConfirmDelete name={title} guideId={guide._id} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    );
}

export default GuideOverview;
