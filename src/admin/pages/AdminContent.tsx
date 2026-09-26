import React, { useState, useEffect } from 'react';
import { Save, CheckCircle2, Phone, Share2, Info, Sparkles } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { updateWebsiteContent, type WebsiteContent } from '../../services/dataService';

export const AdminContent: React.FC = () => {
  const { content, loading } = useDataStore();
  const [formData, setFormData] = useState<WebsiteContent | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData(content);
    }
  }, [content]);

  if (loading || !formData) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    await updateWebsiteContent(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D39D]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3A230B]">
            Website Content & Copy Editor
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Edit main copy, contact numbers, social links, and headlines displayed on the public website.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-6 py-2.5 rounded-xl bg-[#583714] text-[#FFE897] font-black text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-[#42280C] shadow-md transition-all border border-[#FFE897]/40 shimmer-btn cursor-pointer"
        >
          <Save className="w-4 h-4 text-[#FFE897]" />
          <span>Save Website Content</span>
        </button>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 border border-emerald-300 text-emerald-900 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-700" />
          <span>Website content saved successfully! Public website will update live.</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8 text-xs">
        
        {/* 1. Hero Section Content */}
        <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E6D39D] text-[#3A230B]">
            <Sparkles className="w-5 h-5 text-[#583714]" />
            <h2 className="font-serif text-lg font-bold">Hero Section Copy</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Hero Title</label>
              <input
                type="text"
                value={formData.hero.title}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, title: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Hero Subtitle / Tagline</label>
              <input
                type="text"
                value={formData.hero.subtitle}
                onChange={(e) => setFormData({
                  ...formData,
                  hero: { ...formData.hero, subtitle: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="uppercase tracking-wider font-bold text-[#3A230B]">Hero Supporting Description</label>
            <textarea
              value={formData.hero.description}
              onChange={(e) => setFormData({
                ...formData,
                hero: { ...formData.hero, description: e.target.value }
              })}
              rows={3}
              className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
            />
          </div>
        </div>

        {/* 2. Contact Information */}
        <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E6D39D] text-[#3A230B]">
            <Phone className="w-5 h-5 text-[#583714]" />
            <h2 className="font-serif text-lg font-bold">Business Contact Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Display Phone Number</label>
              <input
                type="text"
                value={formData.contact.phoneDisplay}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, phoneDisplay: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">WhatsApp Number (digits)</label>
              <input
                type="text"
                value={formData.contact.whatsappNumber}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, whatsappNumber: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Contact Email</label>
              <input
                type="email"
                value={formData.contact.email}
                onChange={(e) => setFormData({
                  ...formData,
                  contact: { ...formData.contact, email: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="uppercase tracking-wider font-bold text-[#3A230B]">Hub / Address Location</label>
            <input
              type="text"
              value={formData.contact.address}
              onChange={(e) => setFormData({
                ...formData,
                contact: { ...formData.contact, address: e.target.value }
              })}
              className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
            />
          </div>
        </div>

        {/* 3. Social Media Links */}
        <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E6D39D] text-[#3A230B]">
            <Share2 className="w-5 h-5 text-[#583714]" />
            <h2 className="font-serif text-lg font-bold">Social Media Profiles</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Instagram URL</label>
              <input
                type="text"
                value={formData.social.instagram}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, instagram: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">Facebook URL</label>
              <input
                type="text"
                value={formData.social.facebook}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, facebook: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">YouTube URL</label>
              <input
                type="text"
                value={formData.social.youtube}
                onChange={(e) => setFormData({
                  ...formData,
                  social: { ...formData.social, youtube: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>
          </div>
        </div>

        {/* 4. CTA Banner Section */}
        <div className="bg-[#FFFDF5] border border-[#E6D39D] p-6 rounded-2xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#E6D39D] text-[#3A230B]">
            <Info className="w-5 h-5 text-[#583714]" />
            <h2 className="font-serif text-lg font-bold">Bottom Call-to-Action Banner</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">CTA Badge</label>
              <input
                type="text"
                value={formData.cta.badge}
                onChange={(e) => setFormData({
                  ...formData,
                  cta: { ...formData.cta, badge: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>

            <div className="space-y-1">
              <label className="uppercase tracking-wider font-bold text-[#3A230B]">CTA Heading</label>
              <input
                type="text"
                value={formData.cta.heading}
                onChange={(e) => setFormData({
                  ...formData,
                  cta: { ...formData.cta, heading: e.target.value }
                })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="uppercase tracking-wider font-bold text-[#3A230B]">CTA Description</label>
            <textarea
              value={formData.cta.description}
              onChange={(e) => setFormData({
                ...formData,
                cta: { ...formData.cta, description: e.target.value }
              })}
              rows={2}
              className="w-full px-3 py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] font-bold"
            />
          </div>
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 rounded-xl bg-[#583714] text-[#FFE897] font-black text-xs uppercase tracking-wider hover:bg-[#42280C] shadow-lg border border-[#FFE897]/40 shimmer-btn cursor-pointer"
          >
            Save All Changes
          </button>
        </div>

      </form>

    </div>
  );
};
