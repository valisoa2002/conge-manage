import { Scheduler } from "@aldabil/react-scheduler";
import axiosClient from "../../axios-client";
import { useEffect, useState } from "react";
import Spinner from "../../partials/Spinner";

function Calendrier() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEvents = () => {
    axiosClient
      .get(`/demandes/infos/to/calendar`)
      .then(({ data }) => {
        const EVENT = data.data.map((e) => ({
          event_id: e.id,
          title: `${e.type} - ${e.name}`,
          start: new Date(e.date_debut),
          end: new Date(e.date_fin),
        }));
        setLoading(false);
        setEvents(EVENT);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="mt-5 mx-4 p-4 bg-slate-100 rounded-md">
      <h3 className="text-gray-900 text-3xl font-semibold my-4">
        Calendrier des congés
      </h3>
      {loading ? (
        <div>
          <Spinner height={80} width={80} color="#111827" />
        </div>
      ) : (
        <Scheduler
          view="week"
          events={events}
          editable={false}
          draggable={false}
          alwaysShowAgendaDays={true}
          customViewer={true}
        />
      )}
    </div>
  );
}

export default Calendrier;
