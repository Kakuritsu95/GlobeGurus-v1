function HorizontalInfoList({ children }) {
  return (
    <ul className="flex space-x-1 text-xs text-gray-700">
      {children.map((info, i) => (
        <li>{`${info}${children.length - 1 === i ? "" : " |"} `}</li>
      ))}
    </ul>
  );
}

export default HorizontalInfoList;
