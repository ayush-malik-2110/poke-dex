import React, { createContext } from 'react'

export type AppDataType = { [key: string]: any };

export type AppContextType = {
  appData: AppDataType;
  setAppData: React.Dispatch<React.SetStateAction<any>>;
};

const defaultAppContext: AppContextType = {
  appData: {
    showPokemonTypeFilterModal: false,
    pageLimit: 12,
    currentPage: 1,
    paginationData: {},
  },
  setAppData: () => undefined,
}

export const AppContext = createContext(defaultAppContext);