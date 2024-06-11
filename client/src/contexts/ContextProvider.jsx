import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

// eslint-disable-next-line react/prop-types
export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});
  const [activeItem, setactiveItem] = useState("profil");
  const [demandesPerUser, setDemandesPerUser] = useState([]);
  const [demandesEffectues, setDemandesEffectues] = useState(0);
  const [solde, setSolde] = useState(0);
  const [demandes, setDemandes] = useState([]);
  const [refus, setRefus] = useState(0);
  const [valid, setValid] = useState(0);
  const [attentes, setAttentes] = useState(0);
  const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));
  const [activeMenu, setActiveMenu] = useState(true);

  // Pour le token
  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("ACCESS_TOKEN", token);
    } else {
      localStorage.removeItem("ACCESS_TOKEN");
    }
  };

  // Pour la section active
  const setActiveSection = (currentSection) => setactiveItem(currentSection);
  return (
    <StateContext.Provider
      value={{
        user,
        token,
        demandesPerUser,
        activeMenu,
        activeItem,
        demandes,
        solde,
        demandesEffectues,
        valid,
        refus,
        attentes,
        setUser,
        setToken,
        setActiveMenu,
        setActiveSection,
        setDemandesPerUser,
        setDemandes,
        setSolde,
        setDemandesEffectues,
        setValid,
        setRefus,
        setAttentes,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
