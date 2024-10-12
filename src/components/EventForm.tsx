import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Music, Info } from 'lucide-react';
import { Event } from '../types';

interface EventFormProps {
  onAddEvent: (event: Omit<Event, 'id'>) => void;
  onUpdateEvent: (event: Event) => void;
  editingEvent: Event | null;
}

const EventForm: React.FC<EventFormProps> = ({ onAddEvent, onUpdateEvent, editingEvent }) => {
  const [event, setEvent] = useState<Omit<Event, 'id'>>({
    horario: '',
    municipio: '',
    grupo_orquesta: '',
    mes: 1,
    dia: 1,
    sitio: '',
    descripcion: ''
  });

  useEffect(() => {
    if (editingEvent) {
      setEvent(editingEvent);
    } else {
      resetForm();
    }
  }, [editingEvent]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      onUpdateEvent(event as Event);
    } else {
      onAddEvent(event);
    }
    resetForm();
  };

  const resetForm = () => {
    setEvent({
      horario: '',
      municipio: '',
      grupo_orquesta: '',
      mes: 1,
      dia: 1,
      sitio: '',
      descripcion: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-indigo-50 p-6 rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-indigo-700">
        {editingEvent ? 'Editar Evento' : 'Agregar Nuevo Evento'}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Clock className="inline-block mr-1" size={16} /> Horario
          </label>
          <input
            type="time"
            name="horario"
            value={event.horario}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block mr-1" size={16} /> Municipio
          </label>
          <input
            type="text"
            name="municipio"
            value={event.municipio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Music className="inline-block mr-1" size={16} /> Grupo/Orquesta
          </label>
          <input
            type="text"
            name="grupo_orquesta"
            value={event.grupo_orquesta}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Calendar className="inline-block mr-1" size={16} /> Fecha
          </label>
          <div className="flex space-x-2">
            <input
              type="number"
              name="mes"
              value={event.mes}
              onChange={handleChange}
              min="1"
              max="12"
              className="w-1/2 p-2 border rounded"
              required
            />
            <input
              type="number"
              name="dia"
              value={event.dia}
              onChange={handleChange}
              min="1"
              max="31"
              className="w-1/2 p-2 border rounded"
              required
            />
          </div>
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <MapPin className="inline-block mr-1" size={16} /> Sitio
          </label>
          <input
            type="text"
            name="sitio"
            value={event.sitio}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            <Info className="inline-block mr-1" size={16} /> Descripción
          </label>
          <textarea
            name="descripcion"
            value={event.descripcion}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            rows={3}
            required
          ></textarea>
        </div>
      </div>
      <button
        type="submit"
        className="mt-4 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition duration-300"
      >
        {editingEvent ? 'Actualizar Evento' : 'Agregar Evento'}
      </button>
    </form>
  );
};

export default EventForm;