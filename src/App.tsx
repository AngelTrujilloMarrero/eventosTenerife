import React, { useState, useEffect } from 'react';
import EventForm from './components/EventForm';
import EventList from './components/EventList';
import { Event } from './types';

function App() {
  const [events, setEvents] = useState<Event[]>([]);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    // Aquí se cargarían los eventos desde la base de datos
    setEvents([
      {
        id: 1,
        horario: '20:00',
        municipio: 'Santa Cruz de Tenerife',
        grupo_orquesta: 'Banda Municipal',
        mes: 3,
        dia: 15,
        sitio: 'Plaza de España',
        descripcion: 'Concierto de primavera'
      }
    ]);
  }, []);

  const addEvent = (newEvent: Omit<Event, 'id'>) => {
    const eventWithId = { ...newEvent, id: Date.now() };
    setEvents([...events, eventWithId]);
    // Aquí se guardaría el evento en la base de datos
  };

  const updateEvent = (updatedEvent: Event) => {
    setEvents(events.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    setEditingEvent(null);
    // Aquí se actualizaría el evento en la base de datos
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter(event => event.id !== id));
    // Aquí se eliminaría el evento de la base de datos
  };

  const startEditing = (event: Event) => {
    setEditingEvent(event);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-yellow-200 via-green-200 to-blue-200 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-600">Eventos en Tenerife</h1>
        <EventForm 
          onAddEvent={addEvent} 
          onUpdateEvent={updateEvent}
          editingEvent={editingEvent}
        />
        <EventList 
          events={events} 
          onDeleteEvent={deleteEvent}
          onEditEvent={startEditing}
        />
      </div>
    </div>
  );
}

export default App;