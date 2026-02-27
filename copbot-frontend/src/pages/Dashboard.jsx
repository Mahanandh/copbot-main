import { motion } from 'framer-motion';
import { Shield, AlertTriangle, FileText, MessageSquare, Target, Activity, MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
    const navigate = useNavigate();

    const quickActions = [
        {
            title: "AI Assistant",
            desc: "Get instant legal guidance or file a report",
            icon: MessageSquare,
            path: "/app/chat",
            color: "blue"
        },
        {
            title: "Emergency SOS",
            desc: "Dispatch immediate police assistance",
            icon: AlertTriangle,
            path: "/app/emergency",
            color: "red"
        },
        {
            title: "File FIR",
            desc: "Step-by-step official complaint guide",
            icon: FileText,
            path: "/app/fir",
            color: "indigo"
        },
        {
            title: "Police Locator",
            desc: "Find and contact nearby jurisdiction",
            icon: MapPin,
            path: "/app/locator",
            color: "purple"
        }
    ];

    return (
        <div className="flex-1 w-full max-w-6xl mx-auto flex flex-col gap-6">

            {/* Welcome Hero */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4"
            >
                <h1 className="text-4xl font-bold tracking-tight text-white mb-2">Welcome to CopBot</h1>
                <p className="text-slate-400 text-lg">Secure node TN-04 • Operational status: Normal</p>
            </motion.div>

            {/* Quick Action Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, idx) => (
                    <motion.div
                        key={action.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.1 }}
                        onClick={() => navigate(action.path)}
                        className="group cursor-pointer glass-panel rounded-2xl p-6 hover:bg-slate-800/80 transition-all border border-slate-700/50 hover:border-blue-500/50 relative overflow-hidden"
                    >
                        {/* Hover Glow */}
                        <div className={`absolute inset-0 bg-${action.color}-500/10 opacity-0 group-hover:opacity-100 transition-opacity blur-xl`} />

                        <div className={`w-12 h-12 rounded-xl bg-${action.color}-500/10 flex items-center justify-center mb-4 border border-${action.color}-500/20`}>
                            <action.icon className={`w-6 h-6 text-${action.color}-400`} />
                        </div>

                        <h3 className="text-lg font-semibold text-white mb-1">{action.title}</h3>
                        <p className="text-sm text-slate-400 leading-relaxed">{action.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Area: Map + Stats Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 flex-1">

                {/* Left Column (2/3) - Live Map Placeholder */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-2 glass-panel rounded-3xl border border-slate-700/50 overflow-hidden flex flex-col min-h-[400px]"
                >
                    <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Target className="w-4 h-4 text-blue-400" />
                            Live Jurisdiction Map
                        </h3>
                        <span className="flex items-center gap-2 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Live Sync
                        </span>
                    </div>
                    <div className="flex-1 bg-slate-900/50 flex items-center justify-center relative inner-shadow">
                        {/* Fake Map Grid */}
                        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#475569 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
                        <div className="relative text-center z-10">
                            <MapPin className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                            <p className="text-slate-500 font-medium">Map integration module loading...</p>
                        </div>
                    </div>
                </motion.div>

                {/* Right Column (1/3) - System Alerts & Stats */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="glass-panel rounded-3xl border border-slate-700/50 flex flex-col min-h-[400px]"
                >
                    <div className="p-4 border-b border-slate-700/50 flex justify-between items-center bg-slate-800/30">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Activity className="w-4 h-4 text-purple-400" />
                            System Intel
                        </h3>
                    </div>

                    <div className="p-5 flex flex-col gap-4 flex-1">
                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-4">
                            <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">Active AI Cases</span>
                            <div className="text-3xl font-bold text-white mt-1">1,204</div>
                            <div className="text-xs text-emerald-400 mt-2 flex items-center gap-1">
                                ↑ 12% from last week
                            </div>
                        </div>

                        <div className="bg-slate-900/50 border border-slate-700/50 rounded-2xl p-4 flex-1">
                            <h4 className="text-sm font-semibold text-slate-300 mb-3">Recent Broadcasts</h4>
                            <div className="space-y-3">
                                <div className="flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-yellow-500 mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-slate-300">Traffic diversion on Anna Salai</p>
                                        <p className="text-xs text-slate-500">10 mins ago</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 items-start">
                                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                                    <div>
                                        <p className="text-sm text-slate-300">Cyber security workshop scheduled</p>
                                        <p className="text-xs text-slate-500">2 hours ago</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

            </div>
        </div>
    );
}
