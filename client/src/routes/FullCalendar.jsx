import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useParams } from "react-router-dom";
import axios from "../api/axios";
import useAuth from "../hooks/useAuth";

const FullCalendarComponent = () => {
  const [events, setEvents] = useState([]);
  const { auth } = useAuth();
  const accessToken = auth.accessToken;

  let { id } = useParams();
  const port =
    process.env.REACT_APP_PRODUCTION_PORT || process.env.REACT_APP_DEV_PORT;
  const HALLDETAILS_ENDPOINT = `/register-hall/${id}`;

  useEffect(() => {
    // Fetch events from server on mount
    const getHallEvents = async () => {
      try {
        const response = await axios.get(HALLDETAILS_ENDPOINT, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        const { data } = response;
        setEvents(data.events);
      } catch (error) {
        if (error?.response) {
          console.log("No Server response");
        } else {
          console.log(error.message);
        }
      }
    };
    getHallEvents();
  }, [id, port, HALLDETAILS_ENDPOINT, accessToken]);

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
          Authorization: `Bearer ${accessToken}`,
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
