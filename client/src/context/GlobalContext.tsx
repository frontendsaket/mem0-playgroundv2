/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useEffect, useState } from "react";
const GlobalContext = createContext<any>({});
// let url = import.meta.env.VITE_URL;

const GlobalState = (props: any) => {
  
  const [logged, setLogged] = useState(false);

  const logout = ()=>{
    localStorage.removeItem("auth-token")
    setLogged(false);
  }

  useEffect(()=>{
    if(localStorage.getItem("auth-token")){
      setLogged(true);
    }
  },[])
  

  return (
    <GlobalContext.Provider value={{logged, setLogged, logout}}>{props.children}</GlobalContext.Provider>
  );
};

export default GlobalContext;
export { GlobalState };
