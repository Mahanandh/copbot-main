import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Home, MessageSquare, AlertTriangle, FileText,
    Scale, MapPin, Edit3, Info, Globe, LogOut, User
} from 'lucide-react';
import { useState } from 'react';

const navItems = [
    { path: '/app', label: 'Home', icon: Home },
    { path: '/app/chat', label: 'Chat', icon: MessageSquare },
    { path: '/app/emergency', label: 'Emergency', icon: AlertTriangle, critical: true },
    { path: '/app/fir', label: 'FIR Guide', icon: FileText },
    { path: '/app/legal', label: 'Legal Info', icon: Scale },
    { path: '/app/locator', label: 'Police Locator', icon: MapPin },
    { path: '/app/complaint', label: 'Complaint', icon: Edit3 },
    { path: '/app/about', label: 'About', icon: Info },
];

export default function TopNavigation({ onLogout }) {
    const [lang, setLang] = useState('EN');
    const [showProfile, setShowProfile] = useState(false);

    return (
        <>
            {/* Centered Dynamic Island Navigation */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
                <motion.nav
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                    className="bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 shadow-2xl rounded-full px-2 py-2 flex items-center gap-1"
                >
                    {navItems.map((item) => (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end={item.path === '/app'}
                            className={({ isActive }) => `
                relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 flex items-center gap-2
                ${isActive
                                    ? item.critical ? 'text-white bg-red-600 shadow-md shadow-red-900/50' : 'text-white bg-blue-600 shadow-md shadow-blue-900/50'
                                    : item.critical ? 'text-red-400 hover:text-red-300 hover:bg-red-950/30' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                                }
              `}
                        >
                            {({ isActive }) => (
                                <>
                                    <item.icon className="w-4 h-4" />
                                    <span className="hidden md:inline-block">{item.label}</span>
                                    {isActive && !item.critical && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute inset-0 bg-blue-600 rounded-full -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                    {isActive && item.critical && (
                                        <motion.div
                                            layoutId="activeNavIndicatorCritical"
                                            className="absolute inset-0 bg-red-600 rounded-full -z-10"
                                            initial={false}
                                            transition={{ type: "spring", stiffness: 350, damping: 30 }}
                                        />
                                    )}
                                </>
                            )}
                        </NavLink>
                    ))}
                </motion.nav>
            </div>

            {/* Top Right Global Controls */}
            <div className="fixed top-6 right-6 z-50 flex items-center gap-4">

                {/* Language Toggle */}
                <button
                    onClick={() => setLang(lang === 'EN' ? 'TA' : 'EN')}
                    className="w-10 h-10 rounded-full bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-700 transition-all shadow-lg"
                    title="Toggle Language"
                >
                    <Globe className="w-4 h-4 absolute opacity-20" />
                    <span className="font-bold text-xs z-10">{lang}</span>
                </button>

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setShowProfile(!showProfile)}
                        className="w-10 h-10 rounded-full bg-blue-900/30 backdrop-blur-xl border border-blue-500/30 flex items-center justify-center text-blue-400 hover:text-blue-300 hover:bg-blue-800/50 transition-all shadow-lg overflow-hidden"
                    >
                        <User className="w-5 h-5" />
                    </button>

                    <AnimatePresence>
                        {showProfile && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                transition={{ duration: 0.15 }}
                                className="absolute right-0 mt-3 w-56 bg-slate-800/95 backdrop-blur-2xl border border-slate-700/50 rounded-2xl shadow-2xl py-2 overflow-hidden"
                            >
                                <div className="px-4 py-3 border-b border-slate-700/50">
                                    <p className="text-sm text-white font-medium">Citizen Dashboard</p>
                                    <p className="text-xs text-slate-400 mt-0.5 truncate">ID: TN-492-8819</p>
                                </div>
                                <div className="py-2">
                                    <button
                                        onClick={onLogout}
                                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors flex items-center gap-3"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        Secure Logout
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </>
    );
}
