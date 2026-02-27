import { NavLink, useLocation } from 'react-router-dom';
import {
    Home,
    MessageSquare,
    ShieldAlert,
    FileText,
    Scale,
    MapPin,
    FileWarning,
    Info,
    LifeBuoy,
    User,
    LogOut,
    Menu
} from 'lucide-react';
import { useState } from 'react';

const NAV_LINKS = [
    { path: '/app', label: 'Home Dashboard', icon: Home },
    { path: '/app/chat', label: 'Chat Assistant', icon: MessageSquare },
    { path: '/app/emergency', label: 'Emergency', icon: ShieldAlert },
    { path: '/app/fir', label: 'FIR Guide', icon: FileText },
    { path: '/app/legal', label: 'Legal Info', icon: Scale },
    { path: '/app/locator', label: 'Police Locator', icon: MapPin },
    { path: '/app/complaint', label: 'Complaint', icon: FileWarning },
    { path: '/app/about', label: 'About', icon: Info },
];

export default function Layout({ children, onLogout }) {
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-800 overflow-hidden selection:bg-teal-100 selection:text-teal-900">

            {/* Mobile Header (visible only on md and below) */}
            <div className="md:hidden fixed top-0 w-full h-16 bg-white border-b border-slate-200 z-50 flex items-center justify-between px-4">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center">
                        <ShieldAlert className="w-5 h-5 text-teal-600" />
                    </div>
                    <span className="font-bold text-lg text-slate-800 tracking-tight">CopBot</span>
                </div>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 text-slate-500">
                    <Menu className="w-6 h-6" />
                </button>
            </div>

            {/* Sidebar - Fixed Left */}
            <aside className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 flex flex-col transition-transform duration-300 ease-in-out
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:shrink-0
      `}>

                {/* Brand Header */}
                <div className="h-20 flex items-center px-8 shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100/50">
                            <ShieldAlert className="w-6 h-6 text-teal-600" />
                        </div>
                        <span className="font-extrabold text-2xl text-slate-900 tracking-tight">CopBot</span>
                    </div>
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1 scrollbar-hide">
                    <div className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">Main Menu</div>
                    {NAV_LINKS.map((link) => {
                        const isActive = location.pathname === link.path || (link.path !== '/app' && location.pathname.startsWith(link.path));

                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all relative
                  ${isActive
                                        ? 'bg-teal-50 text-teal-700'
                                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}
                `}
                            >
                                {/* Active Indicator Bar */}
                                {isActive && (
                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-teal-500 rounded-r-md rounded-l-none" />
                                )}
                                <link.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-teal-600' : 'text-slate-400'}`} />
                                {link.label}
                            </NavLink>
                        );
                    })}
                </nav>

                {/* Bottom Profile / Help Widget */}
                <div className="p-6 shrink-0 border-t border-slate-100">
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 mb-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm">
                                <User className="w-5 h-5 text-slate-600" />
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-bold text-slate-800 truncate leading-tight">Civic User</p>
                                <p className="text-xs text-slate-500 truncate">Verified Account</p>
                            </div>
                        </div>
                        <button className="w-full py-2 bg-white border border-slate-200 shadow-sm rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 hover:text-teal-600 transition-colors flex items-center justify-center gap-2">
                            <LifeBuoy className="w-4 h-4" />
                            Help & Support
                        </button>
                    </div>

                    <button
                        onClick={onLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-semibold text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"
                    >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </button>
                </div>

            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full overflow-y-auto bg-slate-50 pt-16 md:pt-0 relative">
                <div className="p-6 md:p-10 w-full max-w-7xl mx-auto flex-1 flex flex-col">
                    {children}
                </div>
            </main>

        </div>
    );
}
