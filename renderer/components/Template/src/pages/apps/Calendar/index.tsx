import { useEffect, useState } from "react";
import '@fullcalendar/react'
import { EventClickArg, EventInput } from "@fullcalendar/core";
import { DateClickArg, Draggable } from "@fullcalendar/interaction/index.js";

// components
import Calendar from "./Calendar";
import AddEditEvent from "./AddEditEvent";
import { PageBreadcrumb } from "../../../components";

// dummy data
import { defaultEvents } from "./data";

const SidePanel = () => {
  // external events
  const externalEvents = [
    {
      id: 1,
      variant: 'success',
      title: "New Theme Release",
    },
    {
      id: 2,
      variant: 'info',
      title: "My Event",
    },
    {
      id: 3,
      variant: 'warning',
      title: "Meet manager",
    },
    {
      id: 4,
      variant: 'danger',
      title: "Create New theme",
    },
  ];

  return (
    <>
      <div id='external-events' className="flex flex-col gap-1">
        <p className="text-sm text-slate-700 dark:text-slate-400 mb-4">Drag and drop your event or click in the calendar</p>
        {(externalEvents || []).map((eve, idx) => {
          return (
            <button
              key={idx}
              className={`external-event bg-${eve.variant} px-3 py-2 rounded text-white text-base text-start w-full mb-2`}
              title={eve.title}
              data-class={`bg-${eve.variant}`}
            >
              <i className="mgc_round_fill me-3 vertical-middle"></i>
              {eve.title}
            </button>
          )
        })}
      </div >

      <div className="mt-5">
        <h5 className="text-center mb-2">How It Works ?</h5>
        <ul className="ps-3">
          <li className="text-sm text-slate-700 dark:text-slate-400 mb-3">
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </li>
          <li className="text-sm text-slate-700 dark:text-slate-400 mb-3">
            Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage.
          </li>
          <li className="text-sm text-slate-700 dark:text-slate-400 mb-3">
            It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
          </li>
        </ul>
      </div>
    </>
  );
};

const CalendarApp = () => {

  /*
    * modal handeling
    */
  const [show, setShow] = useState<boolean>(false);
  const onCloseModal = () => {
    setShow(false);
    setEventData({});
    setDateInfo({});
  };
  const onOpenModal = () => setShow(true);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  /*
   * event data
   */
  const [events, setEvents] = useState<EventInput[]>([...defaultEvents]);
  const [eventData, setEventData] = useState<EventInput>({});
  const [dateInfo, setDateInfo] = useState<any>({});

  useEffect(() => {
    // create dragable events
    const draggableEl = document.getElementById("external-events");
    new Draggable(draggableEl!, {
      itemSelector: ".external-event",
    });
  }, []);

  /*
    calendar events
    */
  // on date click
  const onDateClick = (arg: DateClickArg) => {
    setDateInfo(arg);
    onOpenModal();
    setIsEditable(false);
  };

  // on event click
  const onEventClick = (arg: EventClickArg) => {
    const event = {
      id: String(arg.event.id),
      title: arg.event.title,
      className: arg.event.classNames[0],
    };
    setEventData(event);
    setIsEditable(true);
    onOpenModal();
  };

  // on drop
  const onDrop = (arg: any) => {
    const dropEventData = arg;
    const title = dropEventData.draggedEl.title;
    if (title !== null) {
      const newEvent = {
        id: String(events.length + 1),
        title: title,
        start: dropEventData ? dropEventData.dateStr : new Date(),
        className: dropEventData.draggedEl.attributes["data-class"]["value"],
      };
      const modifiedEvents = [...events];
      modifiedEvents.push(newEvent);
      setEvents(modifiedEvents);
    }
  };

  /*
    on add event 
    */
  const onAddEvent = (data: any) => {
    const modifiedEvents = [...events];
    const event = {
      id: String(modifiedEvents.length + 1),
      title: data.title,
      start: Object.keys(dateInfo).length !== 0 ? dateInfo.date : new Date(),
      className: data.className,
    };
    modifiedEvents.push(event);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  /*
    on update event
    */
  const onUpdateEvent = (data: any) => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e: any) => e["id"] === eventData!.id);
    modifiedEvents[idx]["title"] = data.title;
    modifiedEvents[idx]["className"] = data.className;
    setEvents(modifiedEvents);
    setIsEditable(false);
    onCloseModal();
  };

  /*
    on remove event
    */
  const onRemoveEvent = () => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e: any) => e["id"] === eventData!.id);
    modifiedEvents.splice(idx, 1);
    setEvents(modifiedEvents);
    onCloseModal();
  };

  /**
   * on event drop
   */
  const onEventDrop = (arg: any) => {
    const modifiedEvents = [...events];
    const idx = modifiedEvents.findIndex((e) => e["id"] === arg.event.id);
    modifiedEvents[idx]["title"] = arg.event.title;
    modifiedEvents[idx]["className"] = arg.event.classNames;
    modifiedEvents[idx]["start"] = arg.event.start;
    modifiedEvents[idx]["end"] = arg.event.end;
    setEvents(modifiedEvents);
    setIsEditable(false);
  };

  // create new event
  const createNewEvent = () => {
    setIsEditable(false);
    onOpenModal();
  };

  return (
    <>
      <PageBreadcrumb title='Calendar' name='Calendar' breadCrumbItems={["Konrix", "Apps", "Calendar"]} />
      <div className="grid lg:grid-cols-4 gap-6">
        <div className="card">
          <div className="p-6">
            <button
              className="px-3 py-2 rounded bg-primary text-white text-base w-full mb-4"
              id="btn-new-event"
              onClick={createNewEvent}
            >
              <i className="mgc_add_line" />
              &nbsp;Create New Event
            </button>
            <SidePanel />
          </div>
        </div >
        <div className="lg:col-span-3">
          <div className="card">
            <div className="p-6">
              <Calendar
                onDateClick={onDateClick}
                onEventClick={onEventClick}
                onDrop={onDrop}
                onEventDrop={onEventDrop}
                events={events}
              />
            </div>
          </div>
        </div>
      </div>

      {/* add new event modal */}
      {show && <AddEditEvent
        isOpen={show}
        onClose={onCloseModal}
        isEditable={isEditable}
        eventData={eventData}
        onUpdateEvent={onUpdateEvent}
        onRemoveEvent={onRemoveEvent}
        onAddEvent={onAddEvent}
      />
      }
    </>
  )
}

export default CalendarApp