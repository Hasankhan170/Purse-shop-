// import { useState, useEffect } from "react";

// export default function ScheduleBuilder() {
//   const [events, setEvents] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState(null);
//   const [formData, setFormData] = useState({
//     title: "",
//     days: [],
//     startTime: "08:00",
//     endTime: "09:00",
//     description: "",
//   });

//   // Initialize with sample data
//   useEffect(() => {
//     const savedEvents = localStorage.getItem("scheduleEvents");
//     if (savedEvents) {
//       setEvents(JSON.parse(savedEvents));
//     }
//   }, []);

//   // Save events to localStorage whenever events change
//   useEffect(() => {
//     localStorage.setItem("scheduleEvents", JSON.stringify(events));
//   }, [events]);

//   const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
//   const timeSlots = [
//     "12 AM",
//     "01 AM",
//     "02 AM",
//     "03 AM",
//     "04 AM",
//     "05 AM",
//     "06 AM",
//     "07 AM",
//     "08 AM",
//     "09 AM",
//     "10 AM",
//     "11 AM",
//     "12 PM",
//     "01 PM",
//     "02 PM",
//     "03 PM",
//     "04 PM",
//     "05 PM",
//     "06 PM",
//     "07 PM",
//     "08 PM",
//     "09 PM",
//     "10 PM",
//     "11 PM",
//   ];

//   const handleDayToggle = (day) => {
//     const updatedDays = formData.days.includes(day)
//       ? formData.days.filter((d) => d !== day)
//       : [...formData.days, day];

//     setFormData({ ...formData, days: updatedDays });
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (formData.days.length === 0) {
//       alert("Please select at least one day");
//       return;
//     }

//     const newEvent = {
//       id: currentEvent ? currentEvent.id : Date.now(),
//       title: formData.title,
//       days: formData.days,
//       startTime: formData.startTime,
//       endTime: formData.endTime,
//       description: formData.description,
//     };

//     if (currentEvent) {
//       // Update existing event
//       setEvents(
//         events.map((event) => (event.id === currentEvent.id ? newEvent : event))
//       );
//     } else {
//       // Add new event
//       setEvents([...events, newEvent]);
//     }

//     resetForm();
//     setShowModal(false);
//   };

//   const resetForm = () => {
//     setFormData({
//       title: "",
//       days: [],
//       startTime: "08:00",
//       endTime: "09:00",
//       description: "",
//     });
//     setCurrentEvent(null);
//   };

//   const handleEdit = (event) => {
//     setCurrentEvent(event);
//     setFormData({
//       title: event.title,
//       days: event.days,
//       startTime: event.startTime,
//       endTime: event.endTime,
//       description: event.description,
//     });
//     setShowModal(true);
//   };

//   const handleDelete = (id) => {
//     if (window.confirm("Are you sure you want to delete this event?")) {
//       setEvents(events.filter((event) => event.id !== id));
//     }
//   };

//   const getEventPosition = (event) => {
//     const [startHour, startMinute] = event.startTime.split(':').map(Number);
//     const [endHour, endMinute] = event.endTime.split(':').map(Number);

//     // Convert to minutes from 12 AM (which is 0 minutes)
//     const startMinutes = (startHour % 12) * 60 + startMinute + (startHour >= 12 ? 12 * 60 : 0);
//     const endMinutes = (endHour % 12) * 60 + endMinute + (endHour >= 12 ? 12 * 60 : 0);
    
//     // Each hour slot is 60px, so 1 minute = 1px
//     const start = startMinutes;
//     const height = Math.max(endMinutes - startMinutes, 30); // Minimum height of 30px (30 minutes)
    
//     return { start, height };
//   };

//   const formatTimeDisplay = (time) => {
//     const [hours, minutes] = time.split(":");
//     const hourNum = parseInt(hours);
//     const ampm = hourNum >= 12 ? "PM" : "AM";
//     const displayHour = hourNum % 12 || 12;
//     return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`;
//   };

//   // Check if event is long enough to show full content
//   const canShowFullContent = (height) => {
//     return height >= 60; // Show full content if event is at least 1 hour
//   };

//   return (
//     <div className="schedule-builder">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="header">
//           <h1>Schedule Builder</h1>
//           <div className="controls">
//             <button
//               className="btn btn-primary"
//               onClick={() => setShowModal(true)}
//             >
//               Add Event
//             </button>
//             <button
//               className="btn btn-secondary"
//               onClick={() => {
//                 if (
//                   window.confirm("Are you sure you want to reset all events?")
//                 ) {
//                   setEvents([]);
//                 }
//               }}
//             >
//               Reset
//             </button>
//           </div>
//         </div>

//         <div className="schedule-container">
//           {/* Time Column */}
//           <div className="time-column">
//             <div className="time-header"></div>
//             {timeSlots.map((time) => (
//               <div key={time} className="time-slot">
//                 <span className="time-label">{time}</span>
//               </div>
//             ))}
//           </div>

//           {/* Day Columns */}
//           {daysOfWeek.map((day) => (
//             <div key={day} className="day-column">
//               <div className="day-header">
//                 <span className="day-name">{day}</span>
//               </div>
//               <div className="day-slots">
//                 {timeSlots.map((time) => (
//                   <div key={`${day}-${time}`} className="time-slot">
//                     <div className="slot-line"></div>
//                   </div>
//                 ))}

//                 {/* Render events for this day */}
//                 {events
//                   .filter((event) => event.days.includes(day))
//                   .map((event) => {
//                     const position = getEventPosition(event);
//                     const showFullContent = canShowFullContent(position.height);
                    
//                     return (
//                       <div
//                         key={`${event.id}-${day}`}
//                         className="event"
//                         style={{
//                           top: `${position.start}px`,
//                           height: `${position.height}px`,
//                           minHeight: '30px'
//                         }}
//                         onClick={() => handleEdit(event)}
//                       >
//                         <div className="event-content">
//                           {showFullContent ? (
//                             <>
//                               <div className="event-title">{event.title}</div>
//                               <div className="event-time">
//                                 {formatTimeDisplay(event.startTime)} -{" "}
//                                 {formatTimeDisplay(event.endTime)}
//                               </div>
//                               {event.description && (
//                                 <div className="event-description">
//                                   {event.description}
//                                 </div>
//                               )}
//                             </>
//                           ) : (
//                             <div className="event-compact">
//                               <div className="event-title-compact">{event.title}</div>
//                               <div className="event-time-compact">
//                                 {formatTimeDisplay(event.startTime)}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                         <button
//                           className="event-delete"
//                           onClick={(e) => {
//                             e.stopPropagation();
//                             handleDelete(event.id);
//                           }}
//                         >
//                           ×
//                         </button>
//                       </div>
//                     );
//                   })}
//               </div>
//             </div>
//           ))}
//         </div>

//         {showModal && (
//           <div className="modal-overlay">
//             <div className="modal">
//               <div className="modal-header">
//                 <h2>{currentEvent ? "Edit Event" : "Add New Event"}</h2>
//                 <button
//                   className="close-btn"
//                   onClick={() => {
//                     setShowModal(false);
//                     resetForm();
//                   }}
//                 >
//                   ×
//                 </button>
//               </div>

//               <form onSubmit={handleSubmit}>
//                 <div className="form-group">
//                   <label>Title</label>
//                   <input
//                     type="text"
//                     name="title"
//                     value={formData.title}
//                     onChange={handleInputChange}
//                     placeholder="Enter event title"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label>Day(s)</label>
//                   <div className="day-selector">
//                     {daysOfWeek.map((day) => (
//                       <button
//                         key={day}
//                         type="button"
//                         className={`day-btn ${
//                           formData.days.includes(day) ? "selected" : ""
//                         }`}
//                         onClick={() => handleDayToggle(day)}
//                       >
//                         {day}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 <div className="form-group time-group">
//                   <div className="time-input">
//                     <label>Start Time</label>
//                     <input
//                       type="time"
//                       name="startTime"
//                       value={formData.startTime}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                   <div className="time-input">
//                     <label>End Time</label>
//                     <input
//                       type="time"
//                       name="endTime"
//                       value={formData.endTime}
//                       onChange={handleInputChange}
//                       required
//                     />
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label>Description</label>
//                   <textarea
//                     name="description"
//                     value={formData.description}
//                     onChange={handleInputChange}
//                     placeholder="Enter event description (optional)"
//                     rows="3"
//                   />
//                 </div>

//                 <div className="modal-actions">
//                   <button type="submit" className="btn btn-primary">
//                     {currentEvent ? "Update Event" : "Add Event"}
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary"
//                     onClick={() => {
//                       setShowModal(false);
//                       resetForm();
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       <style jsx>{`
//         .schedule-builder {
//           font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
//           background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 100%);
//           min-height: 100vh;
//           padding: 20px 0;
//         }

//         .max-w-7xl {
//           max-width: 1280px;
//         }

//         .mx-auto {
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .px-4 {
//           padding-left: 1rem;
//           padding-right: 1rem;
//         }

//         .header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 2rem;
//           padding: 0 1rem;
//         }

//         h1 {
//           color: #1b5e20;
//           margin: 0;
//           font-size: 2.25rem;
//           font-weight: 700;
//           text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
//         }

//         .controls {
//           display: flex;
//           gap: 12px;
//         }

//         .btn {
//           padding: 12px 24px;
//           border: none;
//           border-radius: 8px;
//           cursor: pointer;
//           font-weight: 600;
//           font-size: 0.95rem;
//           transition: all 0.3s ease;
//           box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
//         }

//         .btn-primary {
//           background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
//           color: white;
//         }

//         .btn-primary:hover {
//           background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//         }

//         .btn-secondary {
//           background: linear-gradient(135deg, #81c784 0%, #66bb6a 100%);
//           color: white;
//         }

//         .btn-secondary:hover {
//           background: linear-gradient(135deg, #76c779 0%, #57a85b 100%);
//           transform: translateY(-2px);
//           box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
//         }

//         .schedule-container {
//           display: flex;
//           background: white;
//           border-radius: 12px;
//           overflow: hidden;
//           box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
//           border: 1px solid #e0e0e0;
//         }

//         .time-column {
//           width: 100px;
//           flex-shrink: 0;
//           background: #f8fdf8;
//           border-right: 2px solid #e8f5e9;
//         }

//         .time-header,
//         .day-header {
//           padding: 20px 12px;
//           background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
//           font-weight: 700;
//           text-align: center;
//           border-bottom: 2px solid #c8e6c9;
//           color: #1b5e20;
          
//           font-size: 1.1rem;
//         }

//         .time-header {
//           padding: 33px 12px;
//           background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
//           font-weight: 700;
//           text-align: center;
//           border-bottom: 2px solid #c8e6c9;
//           color: #1b5e20;
          
//           font-size: 1.1rem;
//         }

//         .day-column {
//           flex: 1;
//           position: relative;
//           border-right: 1px solid #f0f0f0;
//         }

//         .day-column:last-child {
//           border-right: none;
//         }

//         .time-slot {
//           height: 60px;
//           border-bottom: 1px solid #f0f0f0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           position: relative;
//           background: white;
//         }

//         .time-label {
//           font-size: 0.85rem;
//           color: #666;
//           font-weight: 500;
//         }

//         .slot-line {
//           width: 100%;
//           height: 1px;
//           background: #f0f0f0;
//           position: absolute;
//           bottom: 0;
//         }

//         .day-slots {
//           position: relative;
//           min-height: 1440px; /* 24 hours * 60px */
//         }

//         .event {
//           position: absolute;
//           left: 4px;
//           right: 4px;
//           background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
//           border-left: 4px solid #4caf50;
//           border-radius: 6px;
//           padding: 6px;
//           overflow: hidden;
//           cursor: pointer;
//           box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
//           transition: all 0.3s ease;
//           z-index: 10;
//           display: flex;
//           flex-direction: column;
//           justify-content: center;
//         }

//         .event:hover {
//           transform: translateY(-2px);
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           background: linear-gradient(135deg, #b2dfdb 0%, #80cbc4 100%);
//         }

//         .event-content {
//           position: relative;
//           z-index: 2;
//           width: 100%;
//         }

//         .event-title {
//           font-weight: 600;
//           font-size: 0.85rem;
//           margin-bottom: 2px;
//           color: #1b5e20;
//           line-height: 1.2;
//           word-wrap: break-word;
//         }

//         .event-time {
//           font-size: 0.7rem;
//           color: #2e7d32;
//           font-weight: 500;
//           margin-bottom: 2px;
//           line-height: 1.1;
//         }

//         .event-description {
//           font-size: 0.65rem;
//           color: #4caf50;
//           opacity: 0.9;
//           line-height: 1.1;
//           margin-top: 2px;
//           word-wrap: break-word;
//         }

//         /* Compact view for short events */
//         .event-compact {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           text-align: center;
//           height: 100%;
//         }

//         .event-title-compact {
//           font-weight: 600;
//           font-size: 0.75rem;
//           color: #1b5e20;
//           line-height: 1.1;
//           margin-bottom: 1px;
//           word-wrap: break-word;
//         }

//         .event-time-compact {
//           font-size: 0.6rem;
//           color: #2e7d32;
//           font-weight: 500;
//           line-height: 1;
//         }

//         .event-delete {
//           position: absolute;
//           top: 2px;
//           right: 4px;
//           background: rgba(255, 255, 255, 0.9);
//           border: none;
//           border-radius: 50%;
//           width: 18px;
//           height: 18px;
//           font-size: 12px;
//           cursor: pointer;
//           color: #d32f2f;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           opacity: 0;
//           transition: opacity 0.2s ease;
//           z-index: 20;
//         }

//         .event:hover .event-delete {
//           opacity: 1;
//         }

//         .modal-overlay {
//           position: fixed;
//           top: 0;
//           left: 0;
//           right: 0;
//           bottom: 0;
//           background-color: rgba(0, 0, 0, 0.6);
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           z-index: 1000;
//           padding: 20px;
//         }

//         .modal {
//           background-color: white;
//           border-radius: 12px;
//           padding: 0;
//           width: 100%;
//           max-width: 500px;
//           box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
//           overflow: hidden;
//         }

//         .modal-header {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           padding: 24px 24px 0;
//           margin-bottom: 20px;
//         }

//         .modal h2 {
//           margin: 0;
//           color: #1b5e20;
//           font-size: 1.5rem;
//           font-weight: 600;
//         }

//         .close-btn {
//           background: none;
//           border: none;
//           font-size: 24px;
//           cursor: pointer;
//           color: #666;
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           transition: background 0.2s ease;
//         }

//         .close-btn:hover {
//           background: #f5f5f5;
//         }

//         form {
//           padding: 0 24px 24px;
//         }

//         .form-group {
//           margin-bottom: 20px;
//         }

//         .form-group label {
//           display: block;
//           margin-bottom: 8px;
//           font-weight: 600;
//           color: #333;
//           font-size: 0.95rem;
//         }

//         .form-group input,
//         .form-group textarea {
//           width: 100%;
//           padding: 12px;
//           border: 2px solid #e0e0e0;
//           border-radius: 8px;
//           box-sizing: border-box;
//           font-size: 1rem;
//           transition: border 0.3s ease;
//         }

//         .form-group input:focus,
//         .form-group textarea:focus {
//           outline: none;
//           border-color: #4caf50;
//           box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
//         }

//         .day-selector {
//           display: grid;
//           grid-template-columns: repeat(7, 1fr);
//           gap: 8px;
//         }

//         .day-btn {
//           padding: 10px 5px;
//           border: 2px solid #e0e0e0;
//           background-color: #f9f9f9;
//           border-radius: 6px;
//           cursor: pointer;
//           font-weight: 500;
//           font-size: 0.9rem;
//           transition: all 0.2s ease;
//         }

//         .day-btn.selected {
//           background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
//           color: white;
//           border-color: #4caf50;
//           transform: scale(1.05);
//         }

//         .time-group {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 16px;
//         }

//         .time-input {
//           display: flex;
//           flex-direction: column;
//         }

//         .modal-actions {
//           display: flex;
//           gap: 12px;
//           justify-content: flex-end;
//           margin-top: 24px;
//         }

//         @media (max-width: 1024px) {
//           .schedule-container {
//             overflow-x: auto;
//           }

//           .time-column,
//           .day-column {
//             min-width: 120px;
//           }
//         }

//         @media (max-width: 768px) {
//           .header {
//             flex-direction: column;
//             gap: 16px;
//             align-items: flex-start;
//           }

//           .controls {
//             width: 100%;
//             justify-content: flex-start;
//           }

//           h1 {
//             font-size: 1.75rem;
//           }

//           .time-group {
//             grid-template-columns: 1fr;
//             gap: 12px;
//           }

//           .day-selector {
//             grid-template-columns: repeat(4, 1fr);
//           }

//           .modal-actions {
//             flex-direction: column;
//           }

//           .btn {
//             width: 100%;
//           }
//         }

//         @media (max-width: 640px) {
//           .schedule-container {
//             border-radius: 8px;
//           }

//           .time-column,
//           .day-column {
//             min-width: 100px;
//           }

//           .time-slot {
//             height: 50px;
//           }

//           .time-label {
//             font-size: 0.75rem;
//           }

//           .day-header {
//             padding: 15px 8px;
//             font-size: 1rem;
//           }

//           .day-slots {
//             min-height: 1200px; /* 24 hours * 50px */
//           }

//           .event {
//             padding: 4px;
//           }

//           .event-title {
//             font-size: 0.75rem;
//           }

//           .event-time {
//             font-size: 0.65rem;
//           }

//           .event-title-compact {
//             font-size: 0.7rem;
//           }

//           .event-time-compact {
//             font-size: 0.55rem;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }


























import { useState, useEffect } from "react";

export default function ScheduleBuilder() {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    days: [],
    startTime: "08:00",
    endTime: "09:00",
    description: "",
  });

  // Initialize with sample data
  useEffect(() => {
    const savedEvents = localStorage.getItem("scheduleEvents");
    if (savedEvents) {
      setEvents(JSON.parse(savedEvents));
    }
  }, []);

  // Save events to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("scheduleEvents", JSON.stringify(events));
  }, [events]);

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const timeSlots = [
    { time: "08 AM", hour: 8 },
    { time: "09 AM", hour: 9 },
    { time: "10 AM", hour: 10 },
    { time: "11 AM", hour: 11 },
    { time: "12 PM", hour: 12 },
    { time: "01 PM", hour: 13 },
    { time: "02 PM", hour: 14 },
    { time: "03 PM", hour: 15 },
  ];

  const handleDayToggle = (day) => {
    const updatedDays = formData.days.includes(day)
      ? formData.days.filter((d) => d !== day)
      : [...formData.days, day];

    setFormData({ ...formData, days: updatedDays });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.days.length === 0) {
      alert("Please select at least one day");
      return;
    }

    const newEvent = {
      id: currentEvent ? currentEvent.id : Date.now(),
      title: formData.title,
      days: formData.days,
      startTime: formData.startTime,
      endTime: formData.endTime,
      description: formData.description,
    };

    if (currentEvent) {
      // Update existing event
      setEvents(
        events.map((event) => (event.id === currentEvent.id ? newEvent : event))
      );
    } else {
      // Add new event
      setEvents([...events, newEvent]);
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      days: [],
      startTime: "08:00",
      endTime: "09:00",
      description: "",
    });
    setCurrentEvent(null);
  };

  const handleEdit = (event) => {
    setCurrentEvent(event);
    setFormData({
      title: event.title,
      days: event.days,
      startTime: event.startTime,
      endTime: event.endTime,
      description: event.description,
    });
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this event?")) {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleSlotClick = (day, hour) => {
    // Convert hour to time format
    const time = `${hour.toString().padStart(2, '0')}:00`;
    setFormData({
      ...formData,
      startTime: time,
      endTime: `${(hour + 1).toString().padStart(2, '0')}:00`,
      days: [day]
    });
    setShowModal(true);
  };

  const getEventPosition = (event, day) => {
    if (!event.days.includes(day)) return null;

    const [startHour, startMinute] = event.startTime.split(':').map(Number);
    const [endHour, endMinute] = event.endTime.split(':').map(Number);

    const startPosition = (startHour - 8) * 80 + (startMinute / 60) * 80;
    const height = ((endHour - startHour) * 60 + (endMinute - startMinute)) * (80 / 60);
    
    return { start: startPosition, height: Math.max(height, 40) };
  };

  const formatTimeDisplay = (time) => {
    const [hours, minutes] = time.split(":");
    const hourNum = parseInt(hours);
    const ampm = hourNum >= 12 ? "PM" : "AM";
    const displayHour = hourNum % 12 || 12;
    return `${displayHour}:${minutes.padStart(2, '0')} ${ampm}`;
  };

  return (
    <div className="schedule-builder">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="header">
          <h1>Schedule Builder</h1>
          <div className="controls">
            <button
              className="btn btn-primary"
              onClick={() => setShowModal(true)}
            >
              <span className="btn-icon">+</span>
              Add
            </button>

            <button
              className="btn btn-secondary"
              onClick={() => {
                if (window.confirm("Are you sure you want to reset all events?")) {
                  setEvents([]);
                }
              }}
            >
              
              Reset
            </button>
          </div>
        </div>

        <div className="schedule-container">
          {/* Time Column */}
          <div className="time-column">
            <div className="time-header"></div>
            {timeSlots.map((slot) => (
              <div key={slot.time} className="time-slot">
                <div className="time-content">
                  <span className="time-number">{slot.time.split(' ')[0]}</span>
                  <span className="time-period">{slot.time.split(' ')[1]}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Day Columns */}
          {daysOfWeek.map((day) => (
            <div key={day} className="day-column">
              <div className="day-header">
                <span className="day-name">{day}</span>
              </div>
              <div className="day-slots">
                {timeSlots.map((slot) => (
                  <div 
                    key={`${day}-${slot.time}`} 
                    className="time-slot clickable-slot"
                    onClick={() => handleSlotClick(day, slot.hour)}
                  >
                    <div className="slot-content"></div>
                  </div>
                ))}
                
                {/* Render events for this day */}
                {events
                  .filter((event) => event.days.includes(day))
                  .map((event) => {
                    const position = getEventPosition(event, day);
                    if (!position) return null;
                    
                    return (
                      <div
                        key={`${event.id}-${day}`}
                        className="event"
                        style={{
                          top: `${position.start}px`,
                          height: `${position.height}px`,
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(event);
                        }}
                      >
                        <div className="event-content">
                          <div className="event-header">
                            <div className="event-title">{event.title}</div>
                            <button
                              className="event-delete"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(event.id);
                              }}
                            >
                              ×
                            </button>
                          </div>
                          <div className="event-time">
                            {formatTimeDisplay(event.startTime)} - {formatTimeDisplay(event.endTime)}
                          </div>
                          {event.description && (
                            <div className="event-description">
                              {event.description}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>

        {showModal && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h2>{currentEvent ? "Edit Event" : "Add New Event"}</h2>
                <button
                  className="close-btn"
                  onClick={() => {
                    setShowModal(false);
                    resetForm();
                  }}
                >
                  ×
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter event title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Day(s)</label>
                  <div className="day-selector">
                    {daysOfWeek.map((day) => (
                      <button
                        key={day}
                        type="button"
                        className={`day-btn ${
                          formData.days.includes(day) ? "selected" : ""
                        }`}
                        onClick={() => handleDayToggle(day)}
                      >
                        {day.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="form-group time-group">
                  <div className="time-input">
                    <label>Start time - End time</label>
                    <div className="time-inputs-row">
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleInputChange}
                        required
                      />
                      <span className="time-separator">-</span>
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Enter event description (optional)"
                    rows="3"
                  />
                </div>

                <div className="modal-actions">
                  <button type="submit" className="btn btn-primary">
                    {currentEvent ? "Update Event" : "Add Event"}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => {
                      setShowModal(false);
                      resetForm();
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <style jsx>{`
        .schedule-builder {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #f0f9f0 0%, #e8f5e9 100%);
          min-height: 100vh;
          padding: 20px 0;
        }

        .max-w-7xl {
          max-width: 1280px;
        }

        .mx-auto {
          margin-left: auto;
          margin-right: auto;
        }

        .px-4 {
          padding-left: 1rem;
          padding-right: 1rem;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          padding: 0 1rem;
        }

        h1 {
          color: #1b5e20;
          margin: 0;
          font-size: 2.25rem;
          font-weight: 700;
        }

        .controls {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }

        .btn {
          padding: 10px 16px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .btn-primary {
          background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
          color: white;
        }

        .btn-primary:hover {
          background: linear-gradient(135deg, #43a047 0%, #2e7d32 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .btn-secondary {
          background: linear-gradient(135deg, #81c784 0%, #66bb6a 100%);
          color: white;
        }

        .btn-secondary:hover {
          background: linear-gradient(135deg, #76c779 0%, #57a85b 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        .btn-icon {
          font-size: 1rem;
        }

        .schedule-container {
          display: flex;
          background: white;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          border: 1px solid #e0e0e0;
        }

        .time-column {
          width: 100px;
          flex-shrink: 0;
          background: #f8fdf8;
          border-right: 2px solid #e8f5e9;
        }

        .time-header,
        .day-header {
          padding: 20px 12px;
          background: linear-gradient(135deg, #e8f5e9 0%, #c8e6c9 100%);
          font-weight: 700;
          text-align: center;
          border-bottom: 2px solid #c8e6c9;
          color: #1b5e20;
          font-size: 1rem;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .day-column {
          flex: 1;
          position: relative;
          border-right: 1px solid #f0f0f0;
        }

        .day-column:last-child {
          border-right: none;
        }

        .time-slot {
          height: 80px;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          background: white;
        }

        .clickable-slot {
          cursor: pointer;
          transition: background-color 0.2s ease;
        }

        .clickable-slot:hover {
          background-color: #f8fdf8;
        }

        .time-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .time-number {
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
        }

        .time-period {
          font-size: 0.8rem;
          color: #666;
          font-weight: 500;
        }

        .slot-content {
          width: 100%;
          height: 100%;
        }

        .day-slots {
          position: relative;
          min-height: 640px; /* 8 hours * 80px */
        }

        .event {
          position: absolute;
          left: 8px;
          right: 8px;
          background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
          border: 2px solid #4caf50;
          border-radius: 8px;
          padding: 8px;
          overflow: hidden;
          cursor: pointer;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .event:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          background: linear-gradient(135deg, #b2dfdb 0%, #80cbc4 100%);
        }

        .event-content {
          height: 100%;
          display: flex;
          flex-direction: column;
        }

        .event-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 4px;
        }

        .event-title {
          font-weight: 600;
          font-size: 0.9rem;
          color: #1b5e20;
          line-height: 1.2;
          flex: 1;
        }

        .event-time {
          font-size: 0.75rem;
          color: #2e7d32;
          font-weight: 500;
          margin-bottom: 4px;
        }

        .event-description {
          font-size: 0.7rem;
          color: #4caf50;
          opacity: 0.9;
          line-height: 1.2;
          flex: 1;
        }

        .event-delete {
          background: rgba(255, 255, 255, 0.9);
          border: none;
          border-radius: 50%;
          width: 20px;
          height: 20px;
          font-size: 14px;
          cursor: pointer;
          color: #d32f2f;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-left: 8px;
          transition: all 0.2s ease;
        }

        .event-delete:hover {
          background: #ffebee;
          transform: scale(1.1);
        }

        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.6);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: 20px;
        }

        .modal {
          background-color: white;
          border-radius: 12px;
          padding: 0;
          width: 100%;
          max-width: 500px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
          overflow: hidden;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 24px 24px 0;
          margin-bottom: 20px;
        }

        .modal h2 {
          margin: 0;
          color: #1b5e20;
          font-size: 1.5rem;
          font-weight: 600;
        }

        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #666;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s ease;
        }

        .close-btn:hover {
          background: #f5f5f5;
        }

        form {
          padding: 0 24px 24px;
        }

        .form-group {
          margin-bottom: 20px;
        }

        .form-group label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          box-sizing: border-box;
          font-size: 1rem;
          transition: border 0.3s ease;
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #4caf50;
          box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
        }

        .day-selector {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
        }

        .day-btn {
          padding: 10px 5px;
          border: 2px solid #e0e0e0;
          background-color: #f9f9f9;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.2s ease;
        }

        .day-btn.selected {
          background: linear-gradient(135deg, #4caf50 0%, #388e3c 100%);
          color: white;
          border-color: #4caf50;
        }

        .time-group {
          display: flex;
          flex-direction: column;
        }

        .time-inputs-row {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .time-separator {
          color: #666;
          font-weight: 500;
        }

        .modal-actions {
          display: flex;
          gap: 12px;
          justify-content: flex-end;
          margin-top: 24px;
        }

        @media (max-width: 1024px) {
          .schedule-container {
            overflow-x: auto;
          }

          .time-column,
          .day-column {
            min-width: 120px;
          }

          .controls {
            gap: 6px;
          }

          .btn {
            padding: 8px 12px;
            font-size: 0.85rem;
          }
        }

        @media (max-width: 768px) {
          .header {
            flex-direction: column;
            gap: 16px;
            align-items: flex-start;
          }

          .controls {
            width: 100%;
            justify-content: flex-start;
          }

          h1 {
            font-size: 1.75rem;
          }

          .day-selector {
            grid-template-columns: repeat(4, 1fr);
          }

          .modal-actions {
            flex-direction: column;
          }

          .btn {
            width: 100%;
          }
        }

        @media (max-width: 640px) {
          .schedule-container {
            border-radius: 8px;
          }

          .time-column,
          .day-column {
            min-width: 100px;
          }

          .time-slot {
            height: 70px;
          }

          .time-number {
            font-size: 1rem;
          }

          .time-period {
            font-size: 0.75rem;
          }

          .day-header {
            padding: 15px 8px;
            font-size: 0.9rem;
          }

          .day-slots {
            min-height: 560px; /* 8 hours * 70px */
          }

          .event {
            padding: 6px;
          }

          .event-title {
            font-size: 0.8rem;
          }

          .event-time {
            font-size: 0.7rem;
          }
        }
      `}</style>
    </div>
  );
}