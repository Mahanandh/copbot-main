export default function Header() {
    return (
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-slate-200 shrink-0">
            <div className="flex items-center gap-3">
                <h2 className="text-lg font-semibold text-slate-900">Police Assistance Chat</h2>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-100">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-medium text-emerald-700">Online</span>
                </div>
            </div>

            <div className="text-sm text-slate-500 border border-slate-200 px-3 py-1.5 rounded-md bg-[#F1F5F9]">
                Secure Session Enabled
            </div>
        </header>
    );
}
