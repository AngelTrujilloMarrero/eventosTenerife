import React from 'react';
import { Calendar, Clock, MapPin, Music, Info, Edit, Trash2 } from 'lucide-react';
import { Event } from '../types';

interface EventListProps {
  events: Event[];
  onDeleteEvent: (id: number) => void;
  onEditEvent: (event: Event) => void;
}

const EventList: React.FC<EventListProps> = ({ events, onDeleteEvent, onEditEvent }) => {
  if (events.length === 0) {
    return <p className="text-center text-gray-500">No hay eventos programados.</p>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">Eventos Programados</h2>
      <div className="space-y-4">
        {events.map((event) => (
          <div key={event.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex justify-between items-start">
              <h3 className="text-xl font-semibold mb-2">{event.grupo_orquesta}</h3>
              <div>
                <button
                  onClick={() => onEditEvent(event)}
                  className="text-blue-600 hover:text-blue-800 mr-2"
                >
                  <Edit size={20} />
                </button>
                <button
                  onClick={() => onDeleteEvent(event.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <p className="flex items-center">
                <Calendar className="mr-2" size={16} />
                {event.dia}/{event.mes}
              </p>
              <p className="flex items-center">
                <Clock className="mr-2" size={16} />
                {event.horario}
              </p>
              <p className="flex items-center">
                <MapPin className="mr-2" size={16} />
                {event.municipio}
              </p>
              <p className="flex items-center">
                <Music className="mr-2" size={16} />
                {event.sitio}
              </p>
            </div>
            <p className="mt-2 flex items-start">
              <Info className="mr-2 mt-1 flex-shrink-0" size={16} />
              {event.descripcion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventList;