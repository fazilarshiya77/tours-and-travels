import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Phone, Mail, MessageSquare, Trash2, X } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { updateInquiryStatus, deleteInquiry, type Inquiry, type InquiryStatus } from '../../services/dataService';

export const AdminInquiries: React.FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const initialFilter = searchParams.get('filter') || (location.state as any)?.filter || 'All';

  const { inquiries, loading } = useDataStore();
  const [filterStatus, setFilterStatus] = useState<string>(initialFilter);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const handleStatusChange = async (id: string, newStatus: InquiryStatus) => {
    await updateInquiryStatus(id, newStatus);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this customer inquiry?')) {
      await deleteInquiry(id);
      if (selectedInquiry?.id === id) {
        setSelectedInquiry(null);
      }
    }
  };

  const filteredInquiries = inquiries.filter(item => {
    const matchesStatus = filterStatus === 'All' || item.status === filterStatus;
    const q = searchQuery.toLowerCase().trim();
    const matchesQuery = !q ||
      item.customerName.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.service.toLowerCase().includes(q) ||
      (item.vehicle && item.vehicle.toLowerCase().includes(q)) ||
      item.pickup.toLowerCase().includes(q) ||
      item.destination.toLowerCase().includes(q);

    return matchesStatus && matchesQuery;
  });

  return (
    <div className="space-y-8 text-left">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D39D]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3A230B]">
            Inquiries & Customer CRM
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Manage incoming ride requests and bookings submitted live from the public website.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Search name, phone, route..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="px-4 py-2 rounded-xl bg-[#FFFDF5] border border-[#E6D39D] text-xs text-[#3A230B] font-bold focus:outline-none focus:border-[#583714] w-full sm:w-64"
          />
        </div>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {['All', 'New', 'Contacted', 'Converted', 'Closed'].map((st) => {
          const count = st === 'All' ? inquiries.length : inquiries.filter(i => i.status === st).length;
          return (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-2 ${
                filterStatus === st
                  ? 'bg-[#583714] text-[#FFE897] shadow-sm font-bold'
                  : 'bg-[#F7EED3] text-[#3A230B] hover:bg-[#FFE897]/50 border border-[#E6D39D]'
              }`}
            >
              <span>{st}</span>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                filterStatus === st ? 'bg-[#FFE897] text-[#3A230B]' : 'bg-[#E6D39D] text-[#3A230B]'
              }`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Inquiries Table */}
      <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-[#F7EED3] border-b border-[#E6D39D] text-[#3A230B] uppercase font-bold tracking-wider">
                <th className="p-4">Customer Name</th>
                <th className="p-4">Phone Number</th>
                <th className="p-4">Service & Vehicle</th>
                <th className="p-4">Travel Date</th>
                <th className="p-4">Route Circuit</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E6D39D]/50 text-[#3A230B] font-bold">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-xs text-[#583714]">
                    No inquiries found matching current filter.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr 
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="hover:bg-[#F7EED3]/50 transition-colors cursor-pointer"
                  >
                    <td className="p-4">
                      <div className="font-bold text-sm text-[#3A230B]">{inq.customerName}</div>
                      <div className="text-[10px] text-[#583714]/70 font-normal">{inq.email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono">{inq.phone}</td>
                    <td className="p-4">
                      <div className="font-bold text-[#3A230B]">{inq.service}</div>
                      <div className="text-[10px] text-[#583714] font-semibold">{inq.vehicle || 'Standard'}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap">{inq.travelDate}</td>
                    <td className="p-4">
                      <div className="text-[11px] text-[#3A230B] truncate max-w-xs">
                        {inq.pickup} ➔ {inq.destination}
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        inq.status === 'New' ? 'bg-amber-100 text-amber-900 border border-amber-300' :
                        inq.status === 'Contacted' ? 'bg-blue-100 text-blue-900 border border-blue-300' :
                        inq.status === 'Converted' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' :
                        'bg-gray-200 text-gray-800'
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedInquiry(inq);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#583714] text-[#FFE897] font-bold text-[11px] hover:bg-[#42280C]"
                        >
                          Details
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(inq.id);
                          }}
                          className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-100"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Panel / Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D39D]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#583714] font-bold block">
                  Customer Inquiry Record
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#3A230B] mt-0.5">
                  {selectedInquiry.customerName}
                </h3>
              </div>
              <button onClick={() => setSelectedInquiry(null)} className="p-1.5 text-[#583714] hover:bg-[#F7EED3] rounded-full">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Grid of Key Fields */}
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Phone Number</span>
                <span className="font-bold text-[#3A230B] text-sm font-mono">{selectedInquiry.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Email Address</span>
                <span className="font-bold text-[#3A230B] block truncate">{selectedInquiry.email}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Service Requested</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.service}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Vehicle Choice</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.vehicle || 'General Fleet'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Travel Date</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.travelDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Passengers</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.passengers} Passengers</span>
              </div>
            </div>

            {/* Route Circuit */}
            <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs space-y-1">
              <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Itinerary Route</span>
              <div className="font-bold text-[#3A230B] text-sm">
                Pickup: <span className="underline">{selectedInquiry.pickup}</span> ➔ Drop: <span className="underline">{selectedInquiry.destination}</span>
              </div>
            </div>

            {/* Customer Message */}
            <div className="p-3.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs space-y-1">
              <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Customer Message / Special Requirements</span>
              <p className="text-[#3A230B] font-medium leading-relaxed">{selectedInquiry.message}</p>
            </div>

            {/* Update Status Actions */}
            <div className="space-y-2 pt-2 border-t border-[#E6D39D]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#583714] block">
                Update Status Workflow:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['New', 'Contacted', 'Converted', 'Closed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-[#583714] text-[#FFE897] shadow-sm font-extrabold'
                        : 'bg-[#F7EED3] text-[#3A230B] hover:bg-[#FFE897]/50 border border-[#E6D39D]'
                    }`}
                  >
                    Mark as {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Contact Buttons */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="py-2.5 rounded-xl bg-[#583714] text-[#FFE897] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call</span>
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
              <a
                href={`mailto:${selectedInquiry.email}`}
                className="py-2.5 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
