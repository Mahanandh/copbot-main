import { useState } from 'react';
import { ShieldAlert, Fingerprint, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            onLogin(); // Trigger mock login and push to /app
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-teal-100">

            {/* Left Column: Branding / Value Prop (Hidden on mobile) */}
            <div className="hidden lg:flex w-[45%] bg-teal-50 relative border-r border-teal-100/50 flex-col justify-between p-12 overflow-hidden">
                <div className="relative z-10">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center border border-teal-100/50">
                            <ShieldAlert className="w-6 h-6 text-teal-600" />
                        </div>
                        <span className="font-extrabold text-2xl text-slate-900 tracking-tight">CopBot</span>
                    </div>
                    <h1 className="mt-20 text-4xl font-extrabold text-slate-900 leading-tight">
                        The intelligent civic platform for citizen empowerment.
                    </h1>
                    <p className="mt-6 text-lg text-slate-600 font-medium max-w-sm leading-relaxed">
                        Securely access legal assistance, file standardized e-FIRs, and connect with your nearest jurisdiction in seconds.
                    </p>
                </div>

                <div className="relative z-10 text-sm font-semibold text-slate-500">
                    Built for Tamil Nadu Police • Protected by 256-bit Encryption
                </div>

                {/* Background abstract overlay */}
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-teal-200/40 rounded-full blur-[100px] pointer-events-none" />
                <div className="absolute top-32 -right-32 w-80 h-80 bg-blue-100/40 rounded-full blur-[80px] pointer-events-none" />
            </div>

            {/* Right Column: Form */}
            <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative bg-white">
                <div className="w-full max-w-sm">

                    <div className="lg:hidden flex items-center gap-3 mb-10">
                        <div className="w-10 h-10 bg-teal-50 rounded-xl flex items-center justify-center border border-teal-100/50">
                            <ShieldAlert className="w-6 h-6 text-teal-600" />
                        </div>
                        <span className="font-extrabold text-3xl text-slate-900 tracking-tight">CopBot</span>
                    </div>

                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Welcome back</h2>
                    <p className="text-slate-500 font-medium mb-8">Please enter your credentials to access your dashboard.</p>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Mail className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium sm:text-sm shadow-sm"
                                    placeholder="citizen@exampe.com"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between mb-1.5">
                                <label className="block text-sm font-bold text-slate-700">Password</label>
                                <a href="#" className="text-sm font-bold text-teal-600 hover:text-teal-700">Forgot?</a>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                    <Lock className="h-5 w-5 text-slate-400" />
                                </div>
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="block w-full pl-11 pr-4 py-3 bg-white border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium sm:text-sm shadow-sm"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading || !email || !password}
                            className="w-full flex justify-center items-center gap-2 py-3.5 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50 transition-colors shadow-sm mt-8"
                        >
                            {isLoading ? (
                                <span className="flex items-center gap-2">Processing <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /></span>
                            ) : (
                                <>
                                    Sign In to Dashboard
                                    <ArrowRight className="w-4 h-4" />
                                </>
                            )}
                        </button>
                    </form>

                    <p className="mt-10 text-center text-sm text-slate-500 font-medium">
                        Don't have an account? <button className="text-teal-600 font-bold hover:text-teal-700" onClick={(e) => { e.preventDefault(); alert("Setup process triggered.") }}>Create account</button>
                    </p>

                </div>
            </div>
        </div>
    );
}
