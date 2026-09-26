import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, MessageSquare, AlertCircle, Wrench, ArrowUpRight, Phone, X } from 'lucide-react';
import { useDataStore } from '../../hooks/useDataStore';
import { updateInquiryStatus, type Inquiry } from '../../services/dataService';

export const AdminDashboard: React.FC = () => {
  const { vehicles, inquiries, services, loading } = useDataStore();
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#583714]" />
      </div>
    );
  }

  const totalVehiclesCount = vehicles.length;
  const totalInquiriesCount = inquiries.length;
  const newInquiriesCount = inquiries.filter(i => i.status === 'New').length;
  const activeServicesCount = services.filter(s => s.isActive).length;

  const recentInquiries = inquiries.slice(0, 6);

  const handleStatusChange = async (id: string, newStatus: any) => {
    await updateInquiryStatus(id, newStatus);
    if (selectedInquiry && selectedInquiry.id === id) {
      setSelectedInquiry({ ...selectedInquiry, status: newStatus });
    }
  };

  return (
    <div className="space-y-8 text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E6D39D]">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#3A230B]">
            CRM Business Dashboard
          </h1>
          <p className="text-xs text-[#583714] font-bold mt-1">
            Real-time mobility operations overview for Taj Tours & Travels
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to="/admin/vehicles"
            className="px-4 py-2 rounded-xl bg-[#583714] text-[#FFE897] text-xs font-bold uppercase tracking-wider hover:bg-[#42280C] transition-colors"
          >
            + Add Vehicle
          </Link>
          <Link
            to="/admin/inquiries"
            className="px-4 py-2 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-[#3A230B] text-xs font-bold uppercase tracking-wider hover:bg-[#FFE897]/50 transition-colors"
          >
            All Inquiries ({totalInquiriesCount})
          </Link>
        </div>
      </div>

      {/* 4 Summary Cards (Clickable Navigation Links) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Vehicles -> /admin/vehicles */}
        <Link 
          to="/admin/vehicles"
          className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm flex items-center justify-between hover:border-[#583714]/60 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-[#583714]/80 block group-hover:text-[#3A230B] transition-colors">
              Total Vehicles
            </span>
            <span className="font-serif text-3xl font-bold text-[#3A230B] flex items-center gap-2">
              {totalVehiclesCount} <span className="text-xs font-sans font-semibold text-[#583714]">Vehicles</span>
            </span>
            <p className="text-[11px] text-[#583714] font-bold group-hover:underline flex items-center gap-1">
              Currently listed in fleet <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714] group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
            <Car className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 2: Total Inquiries -> /admin/inquiries */}
        <Link 
          to="/admin/inquiries"
          className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm flex items-center justify-between hover:border-[#583714]/60 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-[#583714]/80 block group-hover:text-[#3A230B] transition-colors">
              Total Inquiries
            </span>
            <span className="font-serif text-3xl font-bold text-[#3A230B]">
              {totalInquiriesCount} <span className="text-xs font-sans font-semibold text-[#583714]">Inquiries</span>
            </span>
            <p className="text-[11px] text-[#583714] font-bold group-hover:underline flex items-center gap-1">
              Received from website <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714] group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
            <MessageSquare className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 3: New Inquiries -> /admin/inquiries?filter=New */}
        <Link 
          to="/admin/inquiries?filter=New"
          className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm flex items-center justify-between hover:border-[#583714]/60 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-[#583714]/80 block group-hover:text-[#3A230B] transition-colors">
              New Inquiries
            </span>
            <span className="font-serif text-3xl font-bold text-[#583714]">
              {newInquiriesCount} <span className="text-xs font-sans font-semibold text-[#583714]">New</span>
            </span>
            <p className="text-[11px] text-[#583714] font-bold group-hover:underline flex items-center gap-1">
              Unread visitor requests <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#FFE897] border border-[#E6D39D] flex items-center justify-center text-[#3A230B] group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
            <AlertCircle className="w-6 h-6" />
          </div>
        </Link>

        {/* Card 4: Active Services -> /admin/services */}
        <Link 
          to="/admin/services"
          className="p-6 rounded-2xl bg-[#FFFDF5] border border-[#E6D39D] shadow-sm flex items-center justify-between hover:border-[#583714]/60 hover:shadow-md hover:-translate-y-0.5 transition-all group cursor-pointer"
        >
          <div className="space-y-1">
            <span className="text-xs uppercase tracking-wider font-bold text-[#583714]/80 block group-hover:text-[#3A230B] transition-colors">
              Active Services
            </span>
            <span className="font-serif text-3xl font-bold text-[#3A230B]">
              {activeServicesCount} <span className="text-xs font-sans font-semibold text-[#583714]">Services</span>
            </span>
            <p className="text-[11px] text-[#583714] font-bold group-hover:underline flex items-center gap-1">
              Currently offered online <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-[#F7EED3] border border-[#E6D39D] flex items-center justify-center text-[#583714] group-hover:bg-[#583714] group-hover:text-[#FFE897] transition-colors">
            <Wrench className="w-6 h-6" />
          </div>
        </Link>

      </div>

      {/* Recent Inquiries Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-[#3A230B]">
            Recent Inquiries
          </h2>
          <Link
            to="/admin/inquiries"
            className="text-xs font-bold text-[#583714] hover:underline flex items-center gap-1"
          >
            <span>View All Inquiries</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="bg-[#FFFDF5] border border-[#E6D39D] rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#F7EED3] border-b border-[#E6D39D] text-[#3A230B] uppercase font-bold tracking-wider">
                  <th className="p-4">Customer</th>
                  <th className="p-4">Phone</th>
                  <th className="p-4">Service</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E6D39D]/50 text-[#3A230B] font-bold">
                {recentInquiries.map((inq) => (
                  <tr 
                    key={inq.id} 
                    className="hover:bg-[#F7EED3]/50 transition-colors cursor-pointer"
                    onClick={() => setSelectedInquiry(inq)}
                  >
                    <td className="p-4">
                      <div className="font-bold text-[#3A230B]">{inq.customerName}</div>
                      <div className="text-[10px] text-[#583714]/70 font-normal">{inq.email}</div>
                    </td>
                    <td className="p-4 whitespace-nowrap font-mono">{inq.phone}</td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 rounded-full bg-[#F7EED3] border border-[#E6D39D] text-[11px] font-bold">
                        {inq.service}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-[11px]">
                      {new Date(inq.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedInquiry(inq);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-[#583714] text-[#FFE897] font-bold text-[11px] hover:bg-[#42280C]"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Inquiry Details Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-[#3A230B]/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#FFFDF5] border border-[#E6D39D] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-left relative max-h-[90vh] overflow-y-auto">
            
            <div className="flex items-center justify-between pb-4 border-b border-[#E6D39D]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#583714] font-bold block">
                  Inquiry Detail Record
                </span>
                <h3 className="font-serif text-xl font-bold text-[#3A230B] mt-0.5">
                  {selectedInquiry.customerName}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="p-1.5 rounded-full text-[#583714] hover:bg-[#F7EED3]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Phone</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.phone}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Email</span>
                <span className="font-bold text-[#3A230B] truncate block">{selectedInquiry.email}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Service</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.service}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Vehicle</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.vehicle || 'Standard Fleet'}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Travel Date</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.travelDate}</span>
              </div>

              <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D]">
                <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Passengers</span>
                <span className="font-bold text-[#3A230B]">{selectedInquiry.passengers}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs space-y-1">
              <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Itinerary Route</span>
              <div className="font-bold text-[#3A230B]">
                {selectedInquiry.pickup} ➔ {selectedInquiry.destination}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#F7EED3] border border-[#E6D39D] text-xs space-y-1">
              <span className="text-[10px] text-[#583714]/80 uppercase font-bold block">Customer Note</span>
              <p className="text-[#3A230B] font-medium leading-relaxed">{selectedInquiry.message}</p>
            </div>

            {/* Status Change Buttons */}
            <div className="space-y-2 pt-2 border-t border-[#E6D39D]">
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#583714] block">
                Update Status:
              </span>
              <div className="flex flex-wrap gap-2">
                {(['New', 'Contacted', 'Converted', 'Closed'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(selectedInquiry.id, st)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      selectedInquiry.status === st
                        ? 'bg-[#583714] text-[#FFE897] shadow-sm'
                        : 'bg-[#F7EED3] text-[#3A230B] hover:bg-[#FFE897]/50 border border-[#E6D39D]'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action Triggers */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <a
                href={`tel:${selectedInquiry.phone}`}
                className="py-2.5 rounded-xl bg-[#583714] text-[#FFE897] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Client</span>
              </a>
              <a
                href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="py-2.5 rounded-xl bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
