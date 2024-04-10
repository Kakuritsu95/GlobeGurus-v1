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
        className={`col-span-full xl:pt-3 ${showMapOnSmallScreens ? "hidden" : "grid"} overflow-auto  sm:overflow-hidden lg:col-span-2 lg:grid xl:col-span-1 xl:row-span-full xl:row-start-1`}
      >
        <div className="grid grid-cols-3 grid-rows-3 gap-4 overflow-y-scroll p-4">
          <div
            className="relative col-span-2 row-span-2 bg-cover bg-center sm:col-span-1 sm:col-start-1 sm:row-span-3 md:col-span-2 md:col-start-1"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <ImageTitleLayout className="absolute right-0 top-0 h-full  shadow-inner-2xl">
              {territory}
            </ImageTitleLayout>
          </div>

          <div className="">
            <h2 className="text-lg font-bold sm:text-lg md:text-xl 2xl:text-xl">
              {title}
            </h2>

            <Link className="underline">{`by ${guide.owner.username}`}</Link>
            <div>
              <span className="font-thin">{`Locations: ${data.places.length}`}</span>
            </div>
          </div>

          <div className="sm col-span-3 row-start-3 sm:col-span-2 sm:col-start-2 sm:row-span-2">
            <div className="font-semibold sm:text-base">About </div>
            <AccordionText>{description}</AccordionText>
          </div>
        </div>
        {/* <div className="relative max-w-72 sm:w-full lg:max-w-full xl:order-2">
              <img src={imageUrl} className="rounded-l" />
              <ImageTitleLayout className="absolute right-0 top-0 h-full w-full shadow-inner-2xl">
                {territory}
              </ImageTitleLayout>
            </div> */}

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
            <Modal.Window adjustPosition="-top-36" name="delete">
              <ConfirmDelete name={title} guideId={guide._id} />
            </Modal.Window>
          </Modal>
        )}
      </div>
    );
}

export default GuideOverview;
