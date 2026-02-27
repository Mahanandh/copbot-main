import { MessageSquare, AlertTriangle, Scale, FileText, User } from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-[280px] bg-white border-r border-slate-200 flex flex-col h-full shrink-0">

            {/* Brand Header */}
            <div className="h-16 flex items-center px-6 border-b border-slate-200">
                <h1 className="text-2xl font-bold text-[#1E3A8A] flex items-center gap-2">
                    <ShieldIcon className="w-6 h-6" />
                    CopBot
                </h1>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 bg-blue-50 text-[#1E3A8A] font-medium rounded-lg">
                    <MessageSquare className="w-5 h-5" />
                    Chat Assistant
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors">
                    <Scale className="w-5 h-5 text-slate-400" />
                    Legal Help
                </a>
                <a href="#" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 font-medium rounded-lg transition-colors">
                    <FileText className="w-5 h-5 text-slate-400" />
                    FIR Guide
                </a>

                <div className="pt-4 mt-4 border-t border-slate-100">
                    <button className="w-full flex items-center justify-between gap-2 px-3 py-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold rounded-lg shadow-sm transition-colors">
                        <span className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5" />
                            Emergency Mode
                        </span>
                    </button>
                </div>
            </nav>

            {/* User Profile */}
            <div className="p-4 border-t border-slate-200 mt-auto">
                <button className="flex items-center gap-3 w-full hover:bg-slate-50 p-2 rounded-lg transition-colors text-left">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center border border-slate-200 shrink-0">
                        <User className="w-5 h-5 text-slate-500" />
                    </div>
                    <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-900 truncate">Citizen Portal</p>
                        <p className="text-xs text-slate-500 truncate">Verified Account</p>
                    </div>
                </button>
            </div>

        </aside>
    );
}

function ShieldIcon(props) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
        </svg>
    );
}
