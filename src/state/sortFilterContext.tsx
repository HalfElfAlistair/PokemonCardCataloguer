import { createContext, useContext, useState, type ReactNode } from "react";

interface DropdownOpenListProps {
  [key: string]: boolean;
}

type SortFilterContextValue = {
  sortFilterModalOpen: boolean;
  toggleSortFilterModal: () => void;

  dropdownOpenList: DropdownOpenListProps;
  updatedropdownOpenList: (id: string) => void;
  resetDropdownOpenList: () => void;

  searchText: string;
  updateSearchText: (val: string) => void;

  defaultTypes: string[];
  filterByType: string[];
  setFilterByType: (types: string[]) => void;
  resetTypeFilter: () => void;

  defaultStages: string[];
  filterByStage: string[];
  setFilterByStage: (stages: string[]) => void;
  resetStageFilter: () => void;

  sortOptions: string[];
  sortBy: string | null;
  updateSortBy: (sortOption: string) => void;
};

const SortFilterContext = createContext<SortFilterContextValue | undefined>(undefined);


export const SortFilterProvider = ({ children }: { children: ReactNode }) => {

  // is the modal open
  const [sortFilterModalOpen, setSortFilterModalOpen] = useState(false);
  const toggleSortFilterModal = () => {
    setSortFilterModalOpen(!sortFilterModalOpen)
    // close any open sort/filter dropdowns when the modal is closed
    if (sortFilterModalOpen === false) {
      resetDropdownOpenList();
    }
  }

  // which dropdown is open
  const [dropdownOpenList, setDropdownOpenList] = useState<DropdownOpenListProps>({ typeFilter: false, stageFilter: false, sortSelect: false });
  const updatedropdownOpenList = (id: string) => {
    // function ensures that when one filter dropdown opens, the rest are closed
    let dropdownOpenListCopy = { ...dropdownOpenList };
    if (dropdownOpenListCopy[id]) {
      dropdownOpenListCopy[id] = false;
    } else {
      for (const dropdownID in dropdownOpenListCopy) {
        // close any other open dropdowns in modal
        if (dropdownID === id) {
          dropdownOpenListCopy[dropdownID] = true;
        } else {
          dropdownOpenListCopy[dropdownID] = false;
        }
      }
    }
    setDropdownOpenList(dropdownOpenListCopy);
  }
  const resetDropdownOpenList = () => {
    let dropdownOpenListCopy = { ...dropdownOpenList };
    for (const dropdownID in dropdownOpenListCopy) {
      dropdownOpenListCopy[dropdownID] = false;
    }
    setDropdownOpenList(dropdownOpenListCopy);
  }

  // search
  const [searchText, setSearchText] = useState<string>('');
  const updateSearchText = (val: string) => {
    setSearchText(val);
  }

  // type filter
  const defaultTypes: string[] = ['Colorless', 'Darkness', 'Dragon', 'Grass', 'Fairy', 'Fire', 'Fighting', 'Lightning', 'Metal', 'Psychic', 'Water'];
  const [filterByType, setFilterByType] = useState<string[]>([]);
  const resetTypeFilter = () => {
    setFilterByType([...defaultTypes]);
  }

  // stage filter
  const defaultStages: string[] = ['Basic', 'Stage 1', 'Stage 2'];
  const [filterByStage, setFilterByStage] = useState<string[]>([]);
  const resetStageFilter = () => {
    setFilterByStage([...defaultStages]);
  }

  // sort options
  const sortOptions = ['Name: A-Z', 'Name: Z-A']
  const [sortBy, setSortBy] = useState<string | null>(null);
  const updateSortBy = (sortOption: string) => {
    setSortBy(sortOption);
  }
  const resetSortBy = () => {
    setSortBy('');
  }


  return (
    <SortFilterContext.Provider
      value={{
        sortFilterModalOpen,
        toggleSortFilterModal,

        dropdownOpenList,
        updatedropdownOpenList,
        resetDropdownOpenList,

        searchText,
        updateSearchText,

        defaultTypes,
        filterByType,
        setFilterByType,
        resetTypeFilter,

        defaultStages,
        filterByStage,
        setFilterByStage,
        resetStageFilter,

        sortOptions,
        sortBy,
        updateSortBy,
      }}
    >
      {children}
    </SortFilterContext.Provider>
  );
}

export const useSortFilterStates = () => {
  const ctx = useContext(SortFilterContext);
  if (!ctx) {
    throw new Error("useData must be used inside <DataProvider>");
  }
  return ctx;
};