import { Activity, MapPin, AlertCircle, TrendingUp, Search, MessageSquare, ShieldAlert, FileText, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function HomeDashboard() {
    const navigate = useNavigate();

    const kpis = [
        { title: "Active Alerts in Zone", value: "3", trend: "+1 since yesterday", trendUp: true, icon: AlertCircle, color: "text-amber-500", bg: "bg-amber-50" },
        { title: "Nearby Police Stations", value: "12", trend: "Within 5km radius", trendUp: true, icon: MapPin, color: "text-blue-500", bg: "bg-blue-50" },
        { title: "Complaints Filed (30d)", value: "0", trend: "0 pending review", trendUp: true, icon: FileText, color: "text-teal-500", bg: "bg-teal-50" },
        { title: "System Uptime", value: "99.9%", trend: "All services operational", trendUp: true, icon: Activity, color: "text-emerald-500", bg: "bg-emerald-50" },
    ];

    const recentAlerts = [
        { id: 1, title: 'Traffic Diversion - Anna Salai', time: '10 mins ago', type: 'info', location: '1.2 km away' },
        { id: 2, title: 'Missing Person Report Updated', time: '1 hour ago', type: 'warning', location: 'T. Nagar (3.5 km)' },
        { id: 3, title: 'Cyber Fraud Awareness Camp', time: 'Yesterday', type: 'event', location: 'Virtual' },
    ];

    return (
        <div className="flex flex-col gap-6 md:gap-8 h-full">

            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1 font-medium">Here's what's happening in your local jurisdiction today.</p>
            </div>

            {/* KPI Top Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                {kpis.map((kpi, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] flex items-start justify-between border border-slate-100 relative group overflow-hidden">
                        <div className="flex flex-col">
                            <span className="text-sm font-semibold text-slate-500 tracking-wide mb-1">{kpi.title}</span>
                            <span className="text-2xl font-black text-slate-800">{kpi.value}</span>
                            <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-teal-600">
                                <TrendingUp className="w-3.5 h-3.5" />
                                <span>{kpi.trend}</span>
                            </div>
                        </div>
                        <div className={`w-10 h-10 rounded-xl ${kpi.bg} flex items-center justify-center shrink-0`}>
                            <kpi.icon className={`w-5 h-5 ${kpi.color}`} />
                        </div>
                        {/* Subtle interactive hover bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-teal-500 w-0 group-hover:w-full transition-all duration-300 ease-out" />
                    </div>
                ))}
            </div>

            {/* Split Columns Main Content */}
            <div className="flex flex-col lg:flex-row gap-6 md:gap-8 flex-1">

                {/* Left Column (60%) */}
                <div className="w-full lg:w-[55%] flex flex-col gap-6 md:gap-8">

                    {/* Quick Action Hub */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Quick Action Hub</h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <button onClick={() => navigate('/app/chat')} className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 transition-all text-center group">
                                <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-teal-100 flex items-center justify-center mb-3 transition-colors">
                                    <MessageSquare className="w-5 h-5 text-slate-600 group-hover:text-teal-600" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">Chat with AI</span>
                                <span className="text-xs text-slate-400 mt-1">Get immediate legal help</span>
                            </button>

                            <button onClick={() => navigate('/app/fir')} className="flex flex-col items-center justify-center p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-center group">
                                <div className="w-12 h-12 rounded-full bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center mb-3 transition-colors">
                                    <FileText className="w-5 h-5 text-slate-600 group-hover:text-blue-600" />
                                </div>
                                <span className="text-sm font-bold text-slate-700">File e-FIR</span>
                                <span className="text-xs text-slate-400 mt-1">Submit official report</span>
                            </button>

                            <button onClick={() => navigate('/app/emergency')} className="flex flex-col items-center justify-center p-5 rounded-xl border border-red-200 bg-red-50/50 hover:bg-red-100 hover:border-red-300 transition-all text-center group">
                                <div className="w-12 h-12 rounded-full bg-red-100 group-hover:bg-red-200 flex items-center justify-center mb-3 transition-colors">
                                    <ShieldAlert className="w-5 h-5 text-red-600" />
                                </div>
                                <span className="text-sm font-bold text-red-700">Emergency SOS</span>
                                <span className="text-xs text-red-500 mt-1">Tap to alert police</span>
                            </button>
                        </div>
                    </div>

                    {/* Recent Regional Alerts */}
                    <div className="bg-white rounded-2xl p-6 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-slate-100 flex-1 flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Recent Regional Alerts</h2>
                            <button className="text-sm font-semibold text-teal-600 hover:text-teal-700">View All</button>
                        </div>

                        <div className="flex flex-col gap-0 divide-y divide-slate-100">
                            {recentAlerts.map(alert => (
                                <div key={alert.id} className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 group">
                                    <div className="flex items-start gap-4">
                                        <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${alert.type === 'warning' ? 'bg-amber-500' : alert.type === 'event' ? 'bg-blue-500' : 'bg-slate-300'}`} />
                                        <div>
                                            <p className="text-sm font-bold text-slate-800 group-hover:text-teal-600 transition-colors">{alert.title}</p>
                                            <p className="text-xs font-semibold text-slate-400 mt-0.5">{alert.location}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-6 sm:pl-0">
                                        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{alert.time}</span>
                                        <button className="p-1 hover:bg-slate-100 rounded text-slate-400 hover:text-teal-600 transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>

                {/* Right Column (40%) - The Map */}
                <div className="w-full lg:w-[45%] bg-white rounded-2xl md:p-2 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] border border-slate-100 flex flex-col min-h-[500px] relative overflow-hidden group">

                    {/* Mock Map Background via absolute positioning */}
                    <div className="absolute inset-0 bg-slate-100 z-0">
                        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#94A3B8 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        {/* Fake streets/parks for visual */}
                        <div className="absolute top-1/4 left-0 right-1/2 h-16 bg-white/50 transform -skew-y-12" />
                        <div className="absolute bottom-1/4 left-1/3 right-0 h-24 bg-teal-600/5 transform skew-y-6" />
                    </div>

                    <div className="relative z-10 w-full p-4 h-full flex flex-col pointer-events-none">

                        {/* Floating Search Bar */}
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-2 flex items-center gap-3 pointer-events-auto w-full mb-auto mt-2 mx-auto md:max-w-md">
                            <Search className="w-5 h-5 text-slate-400 ml-2" />
                            <input
                                type="text"
                                placeholder="Search jurisdiction or station..."
                                className="flex-1 bg-transparent border-none focus:outline-none text-sm text-slate-700 font-medium placeholder-slate-400"
                            />
                        </div>

                        {/* Centered Map Pin */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                            <div className="relative pointer-events-auto cursor-pointer group/pin">
                                <MapPin className="w-10 h-10 text-teal-600 drop-shadow-md relative z-10 transition-transform group-hover/pin:-translate-y-1" fill="white" strokeWidth={1.5} />
                                <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-[100%] blur-sm z-0" />

                                {/* Floating tooltip */}
                                <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover/pin:opacity-100 transition-opacity">
                                    Current Location Node
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 border-l-4 border-r-4 border-t-4 border-x-transparent border-t-slate-800" />
                                </div>
                            </div>
                            <div className="w-16 h-16 bg-teal-500/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                        </div>

                        {/* Bottom Left Status */}
                        <div className="mt-auto bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg border border-slate-200/50 shadow-sm inline-flex items-center gap-2 self-start pointer-events-auto">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-xs font-bold text-slate-600">Map Services Connected</span>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}
