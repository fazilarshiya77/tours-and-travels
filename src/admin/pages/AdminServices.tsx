import React, { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff, X } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { createService, updateService, deleteService, type ExtendedServiceItem } from '../../services/dataService';

export const AdminServices: React.FC = () => {
  const { services, loading } = useDataStore();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ExtendedServiceItem | null>(null);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [description, setDescription] = useState('');
  const [icon, setIcon] = useState('Navigation');
  const [image, setImage] = useState('');
  const [ctaText, setCtaText] = useState('Book Service Now');
  const [featuresText, setFeaturesText] = useState('24/7 Dispatch, Sanitized Cabins, Transparent Tariff');
  const [isActive, setIsActive] = useState(true);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const openAddModal = () => {
    setEditingService(null);
    setTitle('');
    setSubtitle('Safe • Comfortable • Reliable Service');
    setDescription('Comprehensive mobility service for city and outstation travel.');
    setIcon('Navigation');
    setImage('/images/chauffeur_service.jpg');
    setCtaText('Book Service Now');
    setFeaturesText('24/7 Phone Dispatch, Transparent Billing, Experienced Pilots');
    setIsActive(true);
    setIsModalOpen(true);
  };

  const openEditModal = (service: ExtendedServiceItem) => {
    setEditingService(service);
    setTitle(service.title);
    setSubtitle(service.subtitle);
    setDescription(service.description);
    setIcon(service.icon);
    setImage(service.image);
    setCtaText(service.ctaText);
    setFeaturesText(service.features.join(', '));
    setIsActive(service.isActive);
    setIsModalOpen(true);
  };

  const handleToggleActive = async (service: ExtendedServiceItem) => {
    await updateService(service.id, { isActive: !service.isActive });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      await deleteService(id);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const featuresList = featuresText.split(',').map(f => f.trim()).filter(Boolean);

    if (editingService) {
      await updateService(editingService.id, {
        title,
        subtitle,
        description,
        icon,
        image,
        ctaText,
        features: featuresList,
        isActive,
      });
    } else {
      await createService({
        title,
        subtitle,
        description,
        icon,
        image,
        ctaText,
        features: featuresList,
        isActive,
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
            Services Management
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Add, edit, or deactivate travel services displayed on the public website.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-5 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C] shadow-md transition-all border border-[#FFE897]/40 shimmer-btn"
        >
          <Plus className="w-4 h-4 text-[#FFE897]" />
          <span>Add New Service</span>
        </button>
      </div>

      {/* Services Table */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7EED3] border-b border-[#E6D39D] text-[#3A230B] uppercase font-bold tracking-wider">
                <th className="p-4">Service</th>
                <th className="p-4">Subtitle</th>
                <th className="p-4">CTA Button</th>
                <th className="p-4">Visibility</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6D39D]/50 text-[#3A230B] font-bold">
              {services.map((s) => (
                <tr key={s.id} className="hover:bg-[#F7EED3]/50 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={s.image}
                        alt={s.title}
                        className="w-12 h-10 object-cover rounded-lg border border-[#E6D39D] shrink-0"
                      />
                      <div>
                        <div className="font-bold text-sm text-[#3A230B]">{s.title}</div>
                        <div className="text-[10px] text-[#583714]/80 font-normal line-clamp-1">{s.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-[11px] font-bold text-[#583714]">{s.subtitle}</td>
                  <td className="p-4">{s.ctaText}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleToggleActive(s)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border ${
                        s.isActive
                          ? 'bg-emerald-100 text-emerald-900 border-emerald-300'
                          : 'bg-gray-100 text-gray-500 border-gray-300'
                      }`}
                    >
                      {s.isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                      <span>{s.isActive ? 'Active' : 'Inactive'}</span>
                    </button>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openEditModal(s)}
                        className="p-2 rounded-lg bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] hover:bg-[#FFE897]"
                        title="Edit Service"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="p-2 rounded-lg bg-red-50 border border-red-200 text-red-600 hover:bg-red-100"
                        title="Delete Service"
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

      {/* Add / Edit Service Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D39D]">
              <h3 className="font-serif text-xl font-bold text-[#3A230B]">
                {editingService ? `Edit ${editingService.title}` : 'Add New Service'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="p-1.5 text-[#583714] hover:bg-[#F7EED3] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Service Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Airport Transfers & Pickup"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Subtitle</label>
                <input
                  type="text"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  placeholder="24/7 Punctual Doorstep Pickup"
                  className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                />
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">Image URL</label>
                  <input
                    type="text"
                    value={image}
                    onChange={(e) => setImage(e.target.value)}
                    placeholder="/images/chauffeur_service.jpg"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>

                <div className="space-y-1">
                  <label className="uppercase tracking-wider font-bold text-[#3A230B]">CTA Button Text</label>
                  <input
                    type="text"
                    value={ctaText}
                    onChange={(e) => setCtaText(e.target.value)}
                    placeholder="Book Service Now"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="uppercase tracking-wider font-bold text-[#3A230B]">Key Features (Comma-separated)</label>
                <input
                  type="text"
                  value={featuresText}
                  onChange={(e) => setFeaturesText(e.target.value)}
                  placeholder="24/7 Dispatch, Sanitized Cabins, Transparent Tariff"
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
                  {editingService ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
