/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext } from "react";
const GlobalContext = createContext<any>({});
// let url = import.meta.env.VITE_URL;

const GlobalState = (props: any) => {
  
  

  return (
    <GlobalContext.Provider value={{}}>{props.children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalState };
