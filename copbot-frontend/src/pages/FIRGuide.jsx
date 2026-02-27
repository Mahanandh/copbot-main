import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, AlertCircle, FileText, ChevronRight, CheckCircle2 } from 'lucide-react';
import { CopBotAPI } from '../services/api';

export default function FIRGuide() {
    const [guidelines, setGuidelines] = useState("");
    const [loading, setLoading] = useState(true);
    const [activeStep, setActiveStep] = useState(0);

    const steps = [
        { title: "Identify Jurisdiction", desc: "Find the police station where the crime occurred." },
        { title: "Draft Complaint", desc: "Write details clearly including time, place, and persons involved." },
        { title: "Submit Application", desc: "Hand over the written complaint to the Duty Officer." },
        { title: "Obtain Copy", desc: "Always collect your free copy of the registered FIR." }
    ];

    useEffect(() => {
        const fetchGuidance = async () => {
            try {
                const data = await CopBotAPI.getFIRGuidelines();
                setGuidelines(data.guidelines || "To file an FIR, follow the standard procedural pipeline.");
            } catch (error) {
                setGuidelines("Error connecting to legal registry. Please ensure you have a physical copy of your ID and the written complaint when visiting the station.");
            } finally {
                setLoading(false);
            }
        };
        fetchGuidance();
    }, []);

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col h-full gap-6">

            <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 bg-teal-50 rounded-2xl flex items-center justify-center border border-teal-100">
                    <FileText className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FIR Registration Guide</h1>
                    <p className="text-slate-500 font-medium">First Information Report Protocol (CrPC Section 154)</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1">

                {/* API Content Panel */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-white border border-slate-200 rounded-3xl p-6 flex flex-col relative overflow-hidden shadow-sm"
                >
                    <div className="absolute top-0 left-0 w-2 h-full bg-teal-500" />

                    <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <BookOpen className="w-5 h-5 text-teal-600" />
                        Official Guidelines
                    </h2>

                    <div className="flex-1 bg-slate-50 rounded-2xl p-5 border border-slate-100 overflow-y-auto w-full">
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                                <div className="h-4 bg-slate-200 rounded w-full"></div>
                                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                            </div>
                        ) : (
                            <div className="prose prose-slate">
                                <p className="text-slate-700 leading-relaxed whitespace-pre-line font-medium">{guidelines}</p>
                            </div>
                        )}
                    </div>

                    {/* Warning Banner updated for contrast */}
                    <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl flex gap-3 text-sm">
                        <AlertCircle className="w-5 h-5 shrink-0 text-amber-600" />
                        <p className="text-amber-900 font-medium">Police cannot refuse to register an FIR for a cognizable offense. Refusal is punishable under Sec 166A IPC.</p>
                    </div>
                </motion.div>

                {/* Interactive Stepper */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white border border-slate-200 shadow-sm rounded-3xl p-6 flex flex-col"
                >
                    <h2 className="text-xl font-bold text-slate-800 mb-6">Filing Procedure</h2>

                    <div className="flex-1 flex flex-col relative pl-4">
                        {/* Vertical Line */}
                        <div className="absolute left-7 top-4 bottom-8 w-px bg-slate-200 z-0" />

                        {steps.map((step, idx) => {
                            const isActive = idx === activeStep;
                            const isPast = idx < activeStep;

                            return (
                                <div
                                    key={idx}
                                    className={`relative z-10 flex gap-4 mb-8 cursor-pointer group`}
                                    onClick={() => setActiveStep(idx)}
                                >
                                    <div className={`
                    w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 mt-1 shadow-sm
                    ${isActive ? 'bg-teal-600' :
                                            isPast ? 'bg-emerald-500' : 'bg-white border-2 border-slate-300 group-hover:border-teal-400'}
                  `}>
                                        {isPast ? <CheckCircle2 className="w-4 h-4 text-white" /> : <span className={`text-xs font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>{idx + 1}</span>}
                                    </div>

                                    <div className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                        <h3 className={`text-lg font-bold ${isActive ? 'text-teal-700' : 'text-slate-800'}`}>
                                            {step.title}
                                        </h3>

                                        <AnimatePresence>
                                            {isActive && (
                                                <motion.div
                                                    initial={{ height: 0, opacity: 0 }}
                                                    animate={{ height: 'auto', opacity: 1 }}
                                                    exit={{ height: 0, opacity: 0 }}
                                                    className="overflow-hidden"
                                                >
                                                    <p className="text-sm text-slate-600 mt-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                                                        {step.desc}
                                                    </p>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    <button className="w-full py-4 mt-auto rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold transition-colors border border-slate-200 flex items-center justify-center gap-2">
                        Generate Draft Template <ChevronRight className="w-4 h-4" />
                    </button>
                </motion.div>

            </div>
        </div>
    );
}
