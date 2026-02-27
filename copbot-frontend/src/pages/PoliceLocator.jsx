import { useState } from 'react';
import { Search, MapPin, Phone, Navigation, AlertCircle } from 'lucide-react';

export default function PoliceLocator() {
    const [searchQuery, setSearchQuery] = useState('');

    const stations = [
        { id: 1, name: "T. Nagar Police Station", distance: "1.2 km away", phone: "+91 44 2834 1000", type: "Law & Order" },
        { id: 2, name: "Guindy Police Station", distance: "3.5 km away", phone: "+91 44 2235 1250", type: "Traffic & L&O" },
        { id: 3, name: "Women Police Station - Adyar", distance: "4.8 km away", phone: "+91 44 2491 5566", type: "All Women Network" }
    ];

    return (
        <div className="flex-1 w-full flex flex-col h-[calc(100vh-100px)] gap-6">

            {/* Header Area */}
            <div className="shrink-0 flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">Police Locator</h1>
                    <p className="text-slate-500 font-medium">Find and navigate to your nearest jurisdiction</p>
                </div>
            </div>

            {/* Split Pane Container */}
            <div className="flex flex-col lg:flex-row gap-6 flex-1 overflow-hidden">

                {/* Left Pane - List Directory (30%) */}
                <div className="w-full lg:w-1/3 flex flex-col gap-4 h-full">

                    {/* Search Bar */}
                    <div className="relative shrink-0 w-full bg-white rounded-2xl shadow-sm border border-slate-200">
                        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                            <Search className="w-5 h-5 text-teal-600" />
                        </div>
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search by PIN code or Area..."
                            className="w-full bg-transparent py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium rounded-2xl"
                        />
                    </div>

                    {/* Active Location Info */}
                    <div className="shrink-0 bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-teal-600 shrink-0 mt-0.5" />
                        <div>
                            <p className="text-sm font-bold text-teal-900">Current Location Detected</p>
                            <p className="text-xs font-medium text-teal-700">Chennai South District • Accuracy: High</p>
                        </div>
                    </div>

                    {/* Station List */}
                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide pb-4">
                        {stations.map(station => (
                            <div key={station.id} className="bg-white border border-slate-200 shadow-sm rounded-2xl p-5 hover:border-teal-300 hover:shadow-md transition-all group">
                                <div className="flex justify-between items-start mb-2">
                                    <h3 className="font-bold text-slate-800 text-lg group-hover:text-teal-700 transition-colors">{station.name}</h3>
                                    <span className="bg-slate-100 text-slate-500 text-[10px] uppercase font-bold px-2 py-1 rounded-md tracking-wider">{station.type}</span>
                                </div>

                                <p className="text-teal-600 font-bold text-sm mb-3 flex items-center gap-1.5">
                                    <MapPin className="w-4 h-4" /> {station.distance}
                                </p>

                                <div className="flex items-center gap-2 mb-4 text-slate-600 font-medium text-sm">
                                    <Phone className="w-4 h-4" /> {station.phone}
                                </div>

                                <button className="w-full py-2.5 rounded-xl border-2 border-slate-100 text-slate-600 font-bold hover:bg-teal-50 hover:border-teal-100 hover:text-teal-700 transition-colors flex items-center justify-center gap-2">
                                    <Navigation className="w-4 h-4" /> Get Directions
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Pane - Map Container (70%) */}
                <div className="w-full lg:w-2/3 bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden relative flex flex-col min-h-[400px]">

                    {/* Map Background Pattern Mockup */}
                    <div className="absolute inset-0 bg-slate-50 z-0">
                        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#CBD5E1 2px, transparent 2px)', backgroundSize: '30px 30px' }} />

                        {/* Fake map geography vectors */}
                        <div className="absolute top-1/4 left-1/4 right-0 h-32 bg-teal-800/5 transform skew-y-12 rounded-3xl blur-md" />
                        <div className="absolute bottom-1/3 left-0 right-1/2 h-24 bg-blue-800/5 transform -skew-y-6 rounded-3xl blur-md" />

                        {/* Main Roads */}
                        <svg className="absolute inset-0 w-full h-full opacity-20 pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 0 100 Q 200 300 800 150" fill="none" stroke="#64748B" strokeWidth="12" />
                            <path d="M 300 0 Q 350 400 600 800" fill="none" stroke="#64748B" strokeWidth="8" />
                        </svg>
                    </div>

                    {/* Centered Map Pin (User Location) */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex flex-col items-center">
                        <div className="relative group cursor-pointer animate-bounce [animation-duration:2s]">
                            <MapPin className="w-12 h-12 text-teal-600 drop-shadow-md relative z-10" fill="white" strokeWidth={1.5} />
                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-1 bg-black/20 rounded-[100%] blur-[2px] z-0" />
                        </div>
                        <div className="w-24 h-24 bg-teal-500/20 rounded-full animate-ping absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10" />
                    </div>

                    {/* Dummy Map UI Overlay */}
                    <div className="relative z-20 mt-auto p-4 flex justify-end w-full">
                        <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-slate-200 shadow-sm flex items-center gap-3">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                            <span className="text-sm font-bold text-slate-700">Live Map Module Loading...</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
