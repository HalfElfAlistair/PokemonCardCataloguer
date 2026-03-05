import { createContext, useContext, useState, type ReactNode } from "react";
import { staticData } from "../assets/static/signedOutData";

type DataContextValue = {
  data: any; // replace with your type
  setData: (d: any) => void;
  resetToDemo: () => void;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);


export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(staticData);

  const resetToDemo = () => {
    setData(staticData);
  }

  return (
    <DataContext.Provider value={{ data, setData, resetToDemo }} >
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  const ctx = useContext(DataContext);
  if (!ctx) {
    throw new Error("useData must be used inside <DataProvider>");
  }
  return ctx;
};