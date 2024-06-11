import {
  FaCalendar,
  FaCalendarPlus,
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
    name: "Demander un congé",
    icon: <FaCalendar />,
    section: "demande",
  },
  {
    name: "Historique",
    icon: <FaCalendarPlus />,
    section: "historique",
  },
];
