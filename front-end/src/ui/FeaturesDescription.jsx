function FeaturesDescription({ children, IconComponent, header }) {
  return (
    <div className="space-y-5 lg:w-9/12 xl:w-1/3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-200 ">
        <IconComponent size={30} className="text-sky-500" />
      </div>
      <h3 className="text-xl font-semibold">{header}</h3>
      <p>{children}</p>
    </div>
  );
}

export default FeaturesDescription;
