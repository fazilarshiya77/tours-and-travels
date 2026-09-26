import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, Star, X } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { createTour, updateTour, deleteTour, type ExtendedTourPackage } from '../../services/dataService';

export const AdminTours: React.FC = () => {
  const { tours, loading } = useDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState<ExtendedTourPackage | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [highlightsText, setHighlightsText] = useState('All India Permit, Verified Pilots, Transparent Toll Tariff');
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
    setEditingTour(null);
    setTitle('');
    setSubtitle('Safe • Comfortable • Reliable');
    setDestination('Intercity & Interstate');
    setDuration('Flexible Outstation Days');
    setStartingPrice('CNG from ₹ 17 / KM');
    setDescription('Guided outstation tour package in Maruti Ertiga 6+1 Seater or Dzire Sedan.');
    setImage('/images/fleet_ertiga.jpg');
    setHighlightsText('Verified Senior Pilots, Flexible Outstation Timings, All India Highway Permits');
    setIsActive(true);
    setIsFeatured(true);
    setIsModalOpen(true);
  };

  const openEditModal = (tour: ExtendedTourPackage) => {
    setEditingTour(tour);
    setTitle(tour.title);
    setSubtitle(tour.subtitle);
    setDestination(tour.distance);
    setDuration(tour.duration);
    setStartingPrice(tour.startingPrice);
    setDescription(tour.description);
    setImage(tour.image);
    setHighlightsText(tour.highlights.join(', '));
    setIsActive(tour.isActive);
    setIsFeatured(tour.isFeatured);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (tour: ExtendedTourPackage) => {
    await updateTour(tour.id, { isActive: !tour.isActive });
  };

  const handleToggleFeatured = async (tour: ExtendedTourPackage) => {
    await updateTour(tour.id, { isFeatured: !tour.isFeatured });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this tour package?')) {
      await deleteTour(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const highlightsList = highlightsText.split(',').map(h => h.trim()).filter(Boolean);

    if (editingTour) {
      await updateTour(editingTour.id, {
        title,
        subtitle,
        distance: destination,
        duration,
        startingPrice,
        description,
        image,
        highlights: highlightsList,
        isActive,
        isFeatured,
      });
    } else {
      await createTour({
        title,
        subtitle,
        distance: destination,
        duration,
        startingPrice,
        description,
        image,
        highlights: highlightsList,
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
            Tours & Rental Packages Management
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Control the tour packages and tariffs displayed live on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C] shadow-md transition-all border border-[#FFE897]/40 shimmer-btn"
        >
          <Plus className="w-4 h-4 text-[#FFE897]" />
          <span>Add Tour Package</span>
        </button>
      </div>

      {/* Tours Table */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7EED3] border-b border-[#E6D39D] text-[#3A230B] uppercase font-bold tracking-wider">
                <th className="p-4">Package</th>
                <th className="p-4">Duration</th>
                <th className="p-4">Starting Price</th>
                <th className="p-4">Featured</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6D39D]/50 text-[#3A230B] font-bold">
              {tours.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7EED3]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.image}
                        alt={t.title}
                        className="w-12 h-10 object-cover rounded-lg border border-[#E6D39D] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#3A230B]">{t.title}</div>
                        <div className="text-[10px] text-[#583714]/80 font-normal line-clamp-1">{t.subtitle}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">{t.duration}</td>
                  <td className="p-4 font-mono">{t.startingPrice}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleFeatured(t)}
                      className={`p-1.5 rounded-lg border transition-colors ${
                        t.isFeatured
                          ? 'bg-amber-100 border-amber-300 text-amber-700'
                          : 'bg-gray-100 border-gray-200 text-gray-400'
                      }`}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </button>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(t)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                        t.isActive
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-gray-100 text-gray-500 border-gray-300'
                      }`}
                    >
                      {t.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{t.isActive ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(t)}
                        className="p-2 rounded-lg bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] hover:bg-[#FFE897]"
                        title="Edit Package"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
                        title="Delete Package"
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

      {/* Add / Edit Tour Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D39D]">
              <h3 className="font-serif text-xl font-bold text-[#3A230B]">
                {editingTour ? `Edit ${editingTour.title}` : 'Add Tour Package'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-[#583714] hover:bg-[#F7EED3] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Package Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. All India Outstation Rides"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Duration</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Flexible Outstation Days"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Starting Price</label>
                  <input
                    type="text"
                    value={startingPrice}
                    onChange={(e) => setStartingPrice(e.target.value)}
                    placeholder="CNG from ₹ 17 / KM"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Image URL</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="/images/fleet_ertiga.jpg"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Highlights (Comma-separated)</label>
                <input
                  type="text"
                  value={highlightsText}
                  onChange={(e) => setHighlightsText(e.target.value)}
                  placeholder="Verified Senior Pilots, All India Permits, CNG AC Available"
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
                  <span>Featured Package</span>
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
                  {editingTour ? 'Save Changes' : 'Create Package'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
