import {
  FaCalendar,
  FaCalendarPlus,
  FaPersonBooth,
  FaRegPlusSquare,
  FaRegQuestionCircle,
  FaUser,
} from "react-icons/fa";

export default [
  {
    name: "Profil",
    icon: <FaUser />,
    section: "profil",
  },
  {
    name: "Personnels",
    icon: <FaPersonBooth />,
    section: "personnel",
  },
  {
    name: "Calendrier",
    icon: <FaCalendar />,
    section: "calendrier",
  },
  {
    name: "Demande(s) en attente(s)",
    icon: <FaRegQuestionCircle />,
    section: "demandes_attentes",
  },
  {
    name: "Historique",
    icon: <FaCalendarPlus />,
    section: "historique",
  },
];
