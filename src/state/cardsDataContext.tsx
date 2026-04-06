import { createContext, useContext, useState, type ReactNode } from "react";
import { demoData } from "../assets/static/demoData";
import type { Data, Cards } from "../types/dataTypes";

type DataContextValue = {
  data: Data;
  setData: (d: Data) => void;
  resetToDemo: () => void;
  cardSearchData: Cards;
  setCardSearchData: (d: Cards) => void;
  cardSearchStatus: string;
  setCardSearchStatus: (s: string) => void;
};

const DataContext = createContext<DataContextValue | undefined>(undefined);


export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState(demoData);
  const resetToDemo = () => {
    setData(demoData);
  }

  const [cardSearchData, setCardSearchData] = useState({});
  const [cardSearchStatus, setCardSearchStatus] = useState('default');

  return (
    <DataContext.Provider value={{ data, setData, resetToDemo, cardSearchData, setCardSearchData, cardSearchStatus, setCardSearchStatus }} >
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