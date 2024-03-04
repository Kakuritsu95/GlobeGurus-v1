import { useEffect } from "react";
import { useContext, createContext, useState } from "react";
import { GoDotFill } from "react-icons/go";
import Button from "./Button";

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
      <div className="mx-2 my-5 flex justify-between md:mx-0">
        <Button type="default" onClick={prevTab}>
          Previous
        </Button>

        <Button type="default" onClick={nextTab}>
          Next
        </Button>
      </div>
    </div>
  );
}

Tab.Layout = Layout;
Tab.Content = Content;

export default Tab;
