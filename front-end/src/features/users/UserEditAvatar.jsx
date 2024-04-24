import useConvertBase64 from "../../hooks/useConvertBase64";
import { FaCloudUploadAlt } from "react-icons/fa";
import { userService } from "../../services/services";
import { updateAvatar } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useState } from "react";
function UserEditAvatar({ username, avatarUrl }) {
  const { base64, setBase64, handleFileInputChange } = useConvertBase64("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="flex max-h-64 w-full space-x-5 rounded-lg  border bg-slate-100 p-5 sm:space-x-6 md:w-2/3 xl:w-1/3">
      <div
        style={{ backgroundImage: `url(${base64 || avatarUrl})` }}
        className="h-36 w-36 rounded-lg bg-cover bg-center bg-no-repeat sm:h-52 sm:w-44"
      />
      <div className="my-10 space-y-5">
        <h3 className="text-xl font-semibold">{username}</h3>
        <form
          onSubmit={async (e) => {
            try {
              e.preventDefault();
              if (!base64) return;
              const avatarImage = e.target.avatarImage.files[0];
              const formData = new FormData();
              formData.append("avatarImage", avatarImage);
              setIsSubmitting(true);
              const { data: newAvatar } =
                await userService.updateUserDetails(formData);
              dispatch(updateAvatar(newAvatar));
              setBase64("");
              toast.success("Avatar updated successfully");
              setIsSubmitting(false);
            } catch (err) {
              toast.error(err.response.data.message);
            }
          }}
        >
          <label
            className="fileLabel block cursor-pointer space-x-2 rounded-lg border bg-blue-500 p-2 text-sm hover:bg-blue-600 lg:text-base"
            htmlFor="avatarImage"
          >
            <FaCloudUploadAlt
              size="20"
              color="white"
              className="mb-1 inline-block"
            />
            <span className="font-semibold text-gray-50">Change Avatar</span>
          </label>
          <input
            onChange={handleFileInputChange}
            id="avatarImage"
            type="file"
          />
          {base64 && (
            <button
              type="submit"
              className={`mt-3 rounded bg-blue-600 p-2 px-3 text-sm font-semibold text-white hover:bg-blue-700 lg:text-base ${isSubmitting && "cursor-not-allowed bg-gray-400 hover:bg-gray-400"}`}
              disabled={isSubmitting}
            >
              Submit
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default UserEditAvatar;
