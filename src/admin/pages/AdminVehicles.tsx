import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { createVehicle, updateVehicle, deleteVehicle, type ExtendedVehicle } from '../../services/dataService';

export const AdminVehicles: React.FC = () => {
  const { vehicles, loading } = useDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState<ExtendedVehicle | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'mpv' | 'sedan'>('sedan');
  const [tagline, setTagline] = useState('');
  const [image, setImage] = useState('');
  const [passengers, setPassengers] = useState(4);
  const [fuelType, setFuelType] = useState<'CNG' | 'Petrol' | 'Hybrid'>('CNG');
  const [transmission, setTransmission] = useState<'Chauffeur Driven' | 'Automatic' | 'Manual'>('Chauffeur Driven');
  const [outstationPerKm, setOutstationPerKm] = useState('₹ 15 / KM');
  const [dailyRate, setDailyRate] = useState('₹ 4,000 / Day');
  const [featuresText, setFeaturesText] = useState('Air Conditioned, Clean Cabin, Professional Pilot');
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const openAddModal = () => {
    setEditingVehicle(null);
    setName('');
    setCategory('sedan');
    setTagline('Comfortable Executive Sedan for City & Outstation Rides');
    setImage('/images/hero_luxury_car.jpg');
    setPassengers(4);
    setFuelType('CNG');
    setTransmission('Chauffeur Driven');
    setOutstationPerKm('₹ 15 / KM');
    setDailyRate('₹ 4,000 / Day');
    setFeaturesText('Air Conditioned, Clean Sanitized Cabin, Professional Senior Driver');
    setIsActive(true);
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (vehicle: ExtendedVehicle) => {
    setEditingVehicle(vehicle);
    setName(vehicle.name);
    setCategory(vehicle.category);
    setTagline(vehicle.tagline);
    setImage(vehicle.image);
    setPassengers(vehicle.passengers);
    setFuelType(vehicle.fuelType);
    setTransmission(vehicle.transmission);
    setOutstationPerKm(vehicle.outstationPerKm);
    setDailyRate(vehicle.dailyRate);
    setFeaturesText(vehicle.features.join(', '));
    setIsActive(vehicle.isActive);
    setIsFeatured(vehicle.isFeatured);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (vehicle: ExtendedVehicle) => {
    await updateVehicle(vehicle.id, { isActive: !vehicle.isActive });
  };

  const handleToggleFeatured = async (vehicle: ExtendedVehicle) => {
    await updateVehicle(vehicle.id, { isFeatured: !vehicle.isFeatured });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this vehicle from the fleet database?')) {
      await deleteVehicle(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = featuresText.split(',').map(f => f.trim()).filter(Boolean);

    if (editingVehicle) {
      await updateVehicle(editingVehicle.id, {
        name,
        category,
        tagline,
        image,
        passengers: Number(passengers),
        fuelType,
        transmission,
        outstationPerKm,
        dailyRate,
        features: featuresList,
        isActive,
        isFeatured,
      });
    } else {
      await createVehicle({
        name,
        category,
        tagline,
        image,
        passengers: Number(passengers),
        fuelType,
        transmission,
        outstationPerKm,
        dailyRate,
        features: featuresList,
        isActive,
        isFeatured,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D39D]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3A230B]">
            Fleet Vehicles Management
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Control the vehicle fleet, tariffs, visibility, and features displayed live on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C] shadow-md transition-all border border-[#FFE897]/40 shimmer-btn"
        >
          <Plus className="w-4 h-4 text-[#FFE897]" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Vehicles Table */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7EED3] border-b border-[#E6D39D] text-[#3A230B] uppercase font-bold tracking-wider">
                <th className="p-4">Vehicle</th>
                <th className="p-4">Category</th>
                <th className="p-4">Seats</th>
                <th className="p-4">Fuel</th>
                <th className="p-4">Tariff</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6D39D]/50 text-[#3A230B] font-bold">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-[#F7EED3]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-12 h-10 object-cover rounded-lg border border-[#E6D39D] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#3A230B]">{v.name}</div>
                        <div className="text-[10px] text-[#583714]/80 font-normal line-clamp-1">{v.tagline}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 uppercase text-[11px] font-bold">{v.category}</td>
                  <td className="p-4">{v.passengers} Passengers</td>
                  <td className="p-4">{v.fuelType}</td>
                  <td className="p-4 font-mono">{v.outstationPerKm}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(v)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        v.isFeatured
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                      }`}
                      title={v.isFeatured ? 'Featured on Homepage' : 'Standard List'}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(v)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                        v.isActive
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-gray-100 text-gray-500 border-gray-300'
                      }`}
                    >
                      {v.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{v.isActive ? 'Active (Live)' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(v)}
                        className="p-2 rounded-lg bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] hover:bg-[#FFE897]"
                        title="Edit Vehicle"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
                        title="Delete Vehicle"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Vehicle Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D39D]">
              <h3 className="font-serif text-xl font-bold text-[#3A230B]">
                {editingVehicle ? `Edit ${editingVehicle.name}` : 'Add New Fleet Vehicle'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-[#583714] hover:bg-[#F7EED3] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Vehicle Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maruti Suzuki Ertiga"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  >
                    <option value="mpv">MPV (Multi Purpose Vehicle)</option>
                    <option value="sedan">Sedan (Executive Sedan)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Tagline / Short Description</label>
                <input
                  type="text"
                  value={tagline}
                  onChange={(e) => setTagline(e.target.value)}
                  placeholder="Spacious 6+1 Seater MPV for Family & Outstation"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Vehicle Image URL / Path</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/ertiga.jpeg or /dzire.png"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  required
                />
                <span className="text-[10px] text-[#583714] font-medium block">
                  Supports local paths (e.g. /ertiga.jpeg) or Supabase storage CDN URLs.
                </span>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Seating Seats</label>
                  <input
                    type="number"
                    value={passengers}
                    onChange={(e) => setPassengers(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Fuel Type</label>
                  <select
                    value={fuelType}
                    onChange={(e) => setFuelType(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  >
                    <option value="CNG">CNG</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Transmission</label>
                  <select
                    value={transmission}
                    onChange={(e) => setTransmission(e.target.value as any)}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  >
                    <option value="Chauffeur Driven">Chauffeur Driven</option>
                    <option value="Automatic">Automatic</option>
                    <option value="Manual">Manual</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Outstation Rate / KM</label>
                  <input
                    type="text"
                    value={outstationPerKm}
                    onChange={(e) => setOutstationPerKm(e.target.value)}
                    placeholder="₹ 17 / KM"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Daily Rate</label>
                  <input
                    type="text"
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    placeholder="₹ 4,500 / Day"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Features (Comma-separated)</label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="Dual AC Vents, Sanitized Cabins, Senior Pilot"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="rounded border-[#E6D39D] text-[#583714] focus:ring-[#583714]"
                  />
                  <span>Active (Visible on public website)</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer font-bold">
                  <input
                    type="checkbox"
                    checked={isFeatured}
                    onChange={(e) => setIsFeatured(e.target.checked)}
                    className="rounded border-[#E6D39D] text-[#583714] focus:ring-[#583714]"
                  />
                  <span>Featured on Homepage</span>
                </label>
              </div>

              <div className="pt-4 border-t border-[#E6D39D] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#F7EED3] text-[#3A230B] font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-[#583714] text-[#FFE897] font-bold uppercase tracking-wider hover:bg-[#42280C]"
                >
                  {editingVehicle ? 'Save Changes' : 'Create Vehicle'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
