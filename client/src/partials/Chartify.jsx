import { PieChart, Pie, Legend, Cell } from "recharts";
import { useStateContext } from "../contexts/ContextProvider";

const COLORS = ["#A855F7", "#EF4444", "#3B82F6"];

function Chartify() {
  const { solde, user, demandesEffectues, refus, valid, attentes } =
    useStateContext();
  const data_user = [
    {
      name: "Demandes effectués",
      value: demandesEffectues,
    },
    {
      name: "Soldes restants",
      value: solde,
    },
    {
      name: "Solde total",
      value: 5,
    },
  ];

  const data_admin = [
    {
      name: "Demandes en attentes",
      value: attentes,
    },
    {
      name: "Demandes réfusés",
      value: refus,
    },
    {
      name: "Demandes validés",
      value: valid,
    },
  ];
  return (
    <div className=" flex justify-center">
      {user.is_admin == 0 && (
        <PieChart width={730} height={300}>
          <Pie
            data={data_user}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            paddingAngle={1}
            innerRadius={50}
          >
            {data_user.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Legend layout="horizontal" align="right" />
        </PieChart>
      )}

      {user.is_admin == 1 && (
        <PieChart width={730} height={300}>
          <Pie
            data={data_admin}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            fill="#8884d8"
            paddingAngle={1}
            innerRadius={50}
          >
            {data_admin.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Legend layout="horizontal" align="right" />
        </PieChart>
      )}
    </div>
  );
}

export default Chartify;
