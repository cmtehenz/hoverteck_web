import { createContext, ReactNode, useState } from "react";

type MaterialContextData = {
  openSidenav: boolean,
  sidenavColor: any,
  sidenavType: string,
  transparentNavbar: boolean,
  fixedNavbar: boolean,
  openConfigurator: boolean,
  setOpenConfigurator: any,
  }

type MaterialProviderProps = {
  children: ReactNode;
}


export const MaterialContext = createContext({} as MaterialContextData)

export function MaterialProvider({children}: MaterialProviderProps){
  const [openConfigurator, setOpenConfigurator] = useState(true);  

  return (
    <MaterialContext.Provider value={
      { openSidenav: false,
      sidenavColor: "blue",
      sidenavType: "dark",
      transparentNavbar: true,
      fixedNavbar: true,
      openConfigurator,
      setOpenConfigurator,
    }
      }>
      { children }
    </MaterialContext.Provider>
  )
}

export const setOpenSidenav = (dispatch: (arg: { type: 'OPEN_SIDENAV'; value: any; }) => any, value: any) =>
  dispatch({ type: "OPEN_SIDENAV", value });
export const setSidenavType = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
  dispatch({ type: "SIDENAV_TYPE", value });
export const setSidenavColor = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
  dispatch({ type: "SIDENAV_COLOR", value });
export const setTransparentNavbar = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
  dispatch({ type: "TRANSPARENT_NAVBAR", value });
export const setFixedNavbar = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
  dispatch({ type: "FIXED_NAVBAR", value });
// export const setOpenConfigurator = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
//   dispatch({ type: "OPEN_CONFIGURATOR", value });