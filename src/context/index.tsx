
import React from "react";

interface MaterialProps {
  
}

export const MaterialTailwind = React.createContext<MaterialProps | null>(null);
MaterialTailwind.displayName = "MaterialTailwindContext";

interface Props {
  children: any
}

export function reducer(state: any, action: { type: string; value: string }) {
  switch (action.type) {
    case "OPEN_SIDENAV": {
      return { ...state, openSidenav: action.value };
    }
    case "SIDENAV_TYPE": {
      return { ...state, sidenavType: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

export function MaterialTailwindControllerProvider({ children } :Props) {
  const initialState = {
    openSidenav: false,
    sidenavColor: "blue",
    sidenavType: "dark",
    transparentNavbar: true,
    fixedNavbar: true,
    openConfigurator: false,
  };

  const [controller, dispatch] = React.useReducer(reducer, initialState);
  const value = React.useMemo(
    () => [controller, dispatch],
    [controller, dispatch]
  );

  return (
    <MaterialTailwind.Provider value={value}>
      {children}
    </MaterialTailwind.Provider>
  );
}

export function useMaterialTailwindController() {
  const context = React.useContext(MaterialTailwind);

  if (!context) {
    throw new Error(
      "useMaterialTailwindController should be used inside the MaterialTailwindControllerProvider."
    );
  }

  return context;
}

MaterialTailwindControllerProvider.displayName = "/src/context/index.tsx";


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
export const setOpenConfigurator = (dispatch: (arg0: { type: string; value: any; }) => any, value: any) =>
  dispatch({ type: "OPEN_CONFIGURATOR", value });