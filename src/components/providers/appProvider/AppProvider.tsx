import { useState } from 'react'
import { AppContext } from './AppContext'

type AppProviderProps = {
  children: React.ReactNode;
}
export const AppProvider = ({ children }: AppProviderProps) => {
  const [appData, setAppData] =useState({
    showPokemonTypeFilterModal: false,
    pageLimit: 12,
    currentPage: 1,
    paginationData: {},
    isTypeFilterApplied: false,
  });
  return (
    <AppContext.Provider
      value={{appData, setAppData}}
    >
      {children}
    </AppContext.Provider>
  );
}