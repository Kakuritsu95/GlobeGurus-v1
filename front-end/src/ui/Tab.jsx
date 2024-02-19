import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { GoDotFill } from "react-icons/go";
const TabContext = createContext();
function Tab({ children }) {
  const [openTab, setOpenTab] = useState(0);
  const [numTabs, setNumTabs] = useState(0);

  function nextTab() {
    if (openTab === numTabs) return;
    setOpenTab((tab) => tab + 1);
  }
  function prevTab() {
    setOpenTab((tab) => tab - 1);
  }
  function setTab(index) {
    setOpenTab(index);
  }
  return (
    <TabContext.Provider
      value={{ openTab, nextTab, prevTab, setTab, numTabs, setNumTabs }}
    >
      {children}
    </TabContext.Provider>
  );
}
function Content({ children }) {
  const { openTab, nextTab, prevTab, setNumTabs } = useContext(TabContext);
  useEffect(() => {
    setNumTabs(children.length);
  }, [children.length]);

  return children[openTab];
}
function Layout({ children }) {
  const { openTab, numTabs, nextTab, prevTab } = useContext(TabContext);

  return (
    <div className="flex flex-col rounded bg-zinc-800 md:px-6">
      <div className="flex justify-center p-3">
        {Array.from({ length: numTabs }).map((_, i) => (
          <GoDotFill
            key={i}
            className={`${openTab === i ? "text-indigo-600" : "text-slate-50"}`}
          />
        ))}
      </div>
      {children}
      <div className="my-5 flex justify-between">
        <button
          disabled={openTab === 0}
          onClick={prevTab}
          className={`cursor-pointer rounded-full border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 ${openTab === 0 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Previous
        </button>

        <button
          disabled={numTabs === openTab + 1}
          onClick={nextTab}
          className={`cursor-pointer rounded-full border border-gray-200 bg-white px-6 py-1.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:outline-none focus:ring-1 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700 ${numTabs === openTab + 1 ? "cursor-not-allowed" : "cursor-pointer"}`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

Tab.Layout = Layout;
Tab.Content = Content;

export default Tab;
