function HorizontalInfoList({ children }) {
  return (
    <ul className="flex space-x-1 text-sm text-gray-700 md:text-base">
      {children.map((info, i) => (
        <li key={i}>{`${info}${children.length - 1 === i ? "" : " |"} `}</li>
      ))}
    </ul>
  );
}

export default HorizontalInfoList;
