function Avatar({ avatarUrl, isDropdown }) {
  return (
    <div
      style={{ backgroundImage: `url(${avatarUrl})` }}
      className={`${isDropdown ? "h-10 w-10" : "h-9 w-9"} rounded-full bg-cover bg-center bg-no-repeat ${isDropdown && "hover:outline hover:outline-2 hover:outline-blue-300"}`}
    />
  );
}

export default Avatar;
