import React from "react";
import {
  Package,
  AlertTriangle,
  CalendarOff,
  ClipboardList,
  Download,
  ShoppingCart,
  SlidersHorizontal,
  MoreVertical,
  ChevronLeft as LeftIcon,
  ChevronRight as RightIcon,
  RotateCcw,
  Barcode,
  Truck,
} from "lucide-react";

const StockOverview = () => {
  const stockItems = [
    {
      name: "Amoxicillin 500mg",
      sku: "AMX-500-202",
      cat: "Antibiotics",
      qty: "1,240",
      min: 500,
      exp: "12/2025",
      status: "In Stock",
      color: "bg-blue-600",
      badge: "bg-emerald-100 text-emerald-700",
    },
    {
      name: "Lisinopril 10mg",
      sku: "LSN-10-881",
      cat: "Cardiovascular",
      qty: "12",
      min: 50,
      exp: "08/2024",
      status: "Critical",
      color: "bg-red-500",
      badge: "bg-red-100 text-red-700",
      isCritical: true,
    },
    {
      name: "Ibuprofen 400mg",
      sku: "IBU-400-093",
      cat: "Analgesics",
      qty: "45",
      min: 100,
      exp: "11/2026",
      status: "Low Stock",
      color: "bg-amber-500",
      badge: "bg-amber-100 text-amber-700",
    },
    {
      name: "Atorvastatin 20mg",
      sku: "ATR-20-442",
      cat: "Cardiovascular",
      qty: "890",
      min: 200,
      exp: "05/2026",
      status: "In Stock",
      color: "bg-blue-600",
      badge: "bg-emerald-100 text-emerald-700",
    },
  ];

  return (
    <main className="md:ml-64 pt-24 px-8 pb-12 font-['Inter'] bg-[#f8fafb] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <p className="text-[11px] tracking-[0.2em] uppercase font-black text-[#0062a2] mb-1">
              Inventory Management
            </p>
            <h1 className="text-4xl font-black tracking-tight text-[#2c3436] font-['Manrope']">
              Stock Overview
            </h1>
          </div>
          <div className="flex gap-3">
            <button className="bg-white border border-slate-200 text-[#596063] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm">
              <Download size={18} />
              Export Inventory
            </button>
            <button className="bg-gradient-to-br from-[#0062a2] to-[#5eb0ff] text-white px-6 py-2.5 rounded-xl font-black text-sm shadow-lg shadow-blue-100 hover:scale-[1.02] transition-all active:scale-95 flex items-center gap-2 font-['Manrope']">
              <ShoppingCart size={18} />
              New Order
            </button>
          </div>
        </div>

        {/* Bento Grid Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard
            icon={<Package className="text-blue-600" />}
            label="Total Items"
            value="2,482"
            trend="+2.4%"
          />
          <StatCard
            icon={<AlertTriangle className="text-red-500" />}
            label="Low Stock Items"
            value="12"
            isError
            border="border-l-4 border-red-200"
          />
          <StatCard
            icon={<CalendarOff className="text-amber-600" />}
            label="Expiring Soon"
            value="48"
            border="border-l-4 border-amber-100"
          />
          <StatCard
            icon={<ClipboardList className="text-purple-600" />}
            label="Pending Orders"
            value="7"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Stock Table Section */}
          <div className="lg:col-span-8 space-y-6">
            <div className="bg-white rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100 overflow-hidden">
              {/* Filters Header */}
              <div className="px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-slate-50">
                <div className="flex gap-6">
                  <select className="bg-transparent border-none text-xs font-black text-[#596063] uppercase tracking-widest focus:ring-0 cursor-pointer outline-none">
                    <option>All Categories</option>
                    <option>Antibiotics</option>
                  </select>
                  <select className="bg-transparent border-none text-xs font-black text-[#596063] uppercase tracking-widest focus:ring-0 cursor-pointer outline-none">
                    <option>Status: All</option>
                    <option>In Stock</option>
                  </select>
                </div>
                <button className="text-[#0062a2] text-[10px] font-black uppercase tracking-widest flex items-center gap-2 hover:opacity-70 transition-opacity">
                  <SlidersHorizontal size={14} />
                  Advanced Filter
                </button>
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left border-separate border-spacing-0">
                  <thead>
                    <tr className="bg-[#f8fafb]/50">
                      <Th label="Product Name" />
                      <Th label="Category" />
                      <Th label="Current Stock" />
                      <Th label="Expiry" />
                      <Th label="Status" />
                      <Th label="" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {stockItems.map((item, idx) => (
                      <tr
                        key={idx}
                        className="hover:bg-[#f8fafb] transition-colors group"
                      >
                        <td className="px-8 py-5">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-1.5 h-8 ${item.color} rounded-full`}
                            ></div>
                            <div>
                              <p className="font-bold text-sm text-[#2c3436]">
                                {item.name}
                              </p>
                              <p className="text-[10px] font-bold text-slate-400 tracking-wider">
                                SKU: {item.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-5 text-xs font-bold text-[#596063]">
                          {item.cat}
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`text-sm font-black ${item.isCritical ? "text-red-500" : "text-[#2c3436]"}`}
                          >
                            {item.qty}
                          </span>
                          <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                            Min: {item.min}
                          </p>
                        </td>
                        <td className="px-8 py-5 text-xs font-bold text-[#2c3436]">
                          {item.exp}
                        </td>
                        <td className="px-8 py-5">
                          <span
                            className={`px-3 py-1 ${item.badge} text-[9px] font-black rounded-full uppercase tracking-widest`}
                          >
                            {item.status}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-right">
                          <button className="w-8 h-8 flex items-center justify-center hover:bg-white hover:shadow-sm rounded-lg transition-all text-slate-400">
                            <MoreVertical size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-8 py-5 bg-[#f8fafb]/50 border-t border-slate-50 flex justify-between items-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  Showing 1-10 of 2,482 items
                </p>
                <div className="flex gap-2">
                  <PageBtn icon={<LeftIcon size={16} />} />
                  <PageBtn label="1" active />
                  <PageBtn label="2" />
                  <PageBtn icon={<RightIcon size={16} />} />
                </div>
              </div>
            </div>
          </div>

          {/* Secondary Column */}
          <div className="lg:col-span-4 space-y-8">
            {/* Health Chart Visual */}
            <div className="bg-white p-8 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.03)] border border-slate-100">
              <h4 className="text-xs font-black text-[#2c3436] uppercase tracking-[0.15em] mb-8 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                Inventory Health
              </h4>
              <div className="relative h-48 flex items-center justify-center">
                <svg className="w-44 h-44 transform -rotate-90">
                  <circle
                    className="text-slate-100"
                    cx="88"
                    cy="88"
                    fill="transparent"
                    r="75"
                    stroke="currentColor"
                    strokeWidth="14"
                  ></circle>
                  <circle
                    className="text-[#0062a2]"
                    cx="88"
                    cy="88"
                    fill="transparent"
                    r="75"
                    stroke="currentColor"
                    strokeDasharray="471"
                    strokeDashoffset="40"
                    strokeWidth="14"
                    strokeLinecap="round"
                  ></circle>
                  <circle
                    className="text-red-400"
                    cx="88"
                    cy="88"
                    fill="transparent"
                    r="75"
                    stroke="currentColor"
                    strokeDasharray="471"
                    strokeDashoffset="440"
                    strokeWidth="14"
                    strokeLinecap="round"
                  ></circle>
                </svg>
                <div className="absolute text-center">
                  <p className="text-4xl font-black font-['Manrope'] text-[#2c3436]">
                    92%
                  </p>
                  <p className="text-[9px] uppercase font-black text-slate-400 tracking-widest mt-1">
                    Healthy
                  </p>
                </div>
              </div>
              <div className="space-y-4 mt-10">
                <HealthItem
                  color="bg-blue-600"
                  label="Optimum Stock"
                  val="2,140"
                />
                <HealthItem color="bg-amber-400" label="Low Stock" val="45" />
                <HealthItem color="bg-red-500" label="Out of Stock" val="12" />
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="bg-[#eaeff0] p-8 rounded-[2rem] space-y-4">
              <h4 className="text-[10px] font-black text-[#0062a2] uppercase tracking-[0.2em] mb-4">
                Shortcuts
              </h4>
              <ShortcutBtn
                icon={<RotateCcw size={18} />}
                label="Adjust Stock"
              />
              <ShortcutBtn icon={<Barcode size={18} />} label="Bulk Scan" />
              <ShortcutBtn
                icon={<Truck size={18} />}
                label="Receive Shipment"
              />
            </div>

            {/* Supplier Card */}
            <div className="relative h-44 rounded-[2rem] overflow-hidden group shadow-lg">
              <img
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                src="https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&q=80&w=400"
                alt="Lab"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002e4d] via-[#002e4d]/40 to-transparent flex flex-col justify-end p-6">
                <p className="text-[9px] text-blue-200 font-black uppercase tracking-[0.2em] mb-1">
                  Featured Supplier
                </p>
                <h5 className="text-white font-black text-lg font-['Manrope']">
                  AstraGen BioMed
                </h5>
                <button className="mt-3 text-white text-[10px] font-black uppercase tracking-widest border-b-2 border-white/30 hover:border-white transition-all w-fit pb-1">
                  View Catalog
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

// --- Composants Internes ---

const StatCard = ({ icon, label, value, trend, isError, border }) => (
  <div
    className={`bg-white p-6 rounded-2xl shadow-sm border border-slate-50 flex flex-col justify-between hover:shadow-md transition-all ${border}`}
  >
    <div className="flex justify-between items-start mb-6">
      <div className="p-3 bg-[#f8fafb] rounded-xl shadow-inner text-[#0062a2]">
        {icon}
      </div>
      {trend && (
        <span className="text-emerald-600 text-[10px] font-black bg-emerald-50 px-2 py-1 rounded-lg">
          {trend}
        </span>
      )}
    </div>
    <div>
      <p className="text-[10px] font-black tracking-widest text-slate-400 uppercase">
        {label}
      </p>
      <h3
        className={`text-3xl font-black font-['Manrope'] mt-2 ${isError ? "text-red-500" : "text-[#2c3436]"}`}
      >
        {value}
      </h3>
    </div>
  </div>
);

const Th = ({ label }) => (
  <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.15em]">
    {label}
  </th>
);

const PageBtn = ({ label, icon, active }) => (
  <button
    className={`w-9 h-9 flex items-center justify-center rounded-xl transition-all font-black text-xs
    ${active ? "bg-[#0062a2] text-white shadow-lg shadow-blue-100" : "bg-white border border-slate-100 text-slate-400 hover:border-[#0062a2] hover:text-[#0062a2]"}
  `}
  >
    {icon || label}
  </button>
);

const HealthItem = ({ color, label, val }) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center gap-3">
      <div className={`w-2.5 h-2.5 ${color} rounded-full`}></div>
      <span className="text-xs font-bold text-[#596063]">{label}</span>
    </div>
    <span className="text-sm font-black text-[#2c3436]">{val}</span>
  </div>
);

const ShortcutBtn = ({ icon, label }) => (
  <button className="w-full py-4 px-5 bg-white rounded-2xl text-left text-sm font-bold text-[#2c3436] flex items-center justify-between group hover:shadow-xl hover:shadow-blue-900/5 transition-all">
    <span className="flex items-center gap-4">
      <span className="text-[#0062a2] opacity-80 group-hover:opacity-100 transition-opacity">
        {icon}
      </span>
      {label}
    </span>
    <RightIcon
      size={16}
      className="text-slate-300 group-hover:translate-x-1 transition-transform group-hover:text-[#0062a2]"
    />
  </button>
);

export default StockOverview;
