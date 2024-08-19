import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";

const FullCalendarComponent = ({ jwt }) => {
  const [events, setEvents] = useState([]);
  let { id } = useParams();
  const port = process.env.PRODUCTION_PORT || process.env.PRODUCTION_PORT;

  useEffect(() => {
    // Fetch events from server on mount
    const getHallEvents = async () => {
      const response = await fetch(`${port}/register-hall/${id}`, {
        method: "get",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      return response;
    };

    getHallEvents().then(async (response) => {
      if (response.ok) {
        const data = await response.json();
        setEvents(data.events);
      } else {
        // console.log(await response.json());
      }
    });
  }, [id, port, jwt]);

  const handleEventAdd = async (info) => {
    const title = prompt("Enter event title here!");

    if (title !== null) {
      const event = {
        title: title,
        start: info.dateStr,
        end: info.dateStr,
      };
      // Create
      // console.log("Event created:", event);
      // Send data to server to save
      const response = await fetch(`${port}/register-hall/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "POST",
        body: JSON.stringify({
          events: [event],
        }),
      });

      if (!response.ok) {
        console.log(response.status);
        return;
      }
      const json = await response.json();
      // console.log(json);
      const newEvent =
        json.registerHall.events[json.registerHall.events.length - 1];
      setEvents([...events, newEvent]);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      events={events}
      dateClick={handleEventAdd}
    />
  );
};

export default FullCalendarComponent;
