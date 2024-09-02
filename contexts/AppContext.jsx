import { createContext, useContext, useState, useEffect, useMemo } from "react";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [isSigned, setIsSigned] = useState(false);

  return (
    <AppContext.Provider
      value={{
        isSigned,
        setIsSigned,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
export const useAppContext = () => useContext(AppContext);
