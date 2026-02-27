import { useState } from 'react';
import { CheckCircle2, FileText, ChevronRight, User, AlertTriangle, ShieldCheck } from 'lucide-react';
import { AI_API } from '../services/apiService';
import { motion, AnimatePresence } from 'framer-motion';

export default function Complaint() {
    const [activeStep, setActiveStep] = useState(1);
    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        incidentType: '',
        dateTime: '',
        description: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [successId, setSuccessId] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    const steps = [
        { id: 1, title: "Personal Info", icon: User },
        { id: 2, title: "Incident Details", icon: AlertTriangle },
        { id: 3, title: "Review & Submit", icon: FileText }
    ];

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleNext = () => {
        if (activeStep < 3) setActiveStep(activeStep + 1);
    };

    const handleBack = () => {
        if (activeStep > 1) setActiveStep(activeStep - 1);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMsg('');
        setIsSubmitting(true);
        try {
            const data = await AI_API.submitComplaint(formData);
            setSuccessId(data.complaint_id || 'FIR-' + Math.floor(Math.random() * 100000));
        } catch (error) {
            setErrorMsg(error.message || 'Failed to submit complaint. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (successId) {
        return (
            <div className="flex flex-col w-full max-w-3xl mx-auto h-full justify-center items-center gap-6 py-10">
                <div className="w-24 h-24 bg-teal-50 rounded-full flex items-center justify-center border-4 border-teal-100">
                    <ShieldCheck className="w-12 h-12 text-teal-600" />
                </div>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight text-center">Submission Verified</h1>
                <div className="bg-white border border-slate-200 rounded-2xl p-8 shadow-sm text-center max-w-md w-full">
                    <p className="text-slate-600 font-medium mb-4">Your preliminary report has been securely registered in the central database.</p>
                    <div className="bg-slate-50 border border-slate-200 rounded-xl py-4 px-6 mb-6">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Tracking ID</p>
                        <p className="text-2xl font-black text-slate-800 tracking-tight">{successId}</p>
                    </div>
                    <button onClick={() => window.location.reload()} className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl shadow-sm transition-all">
                        Return to Dashboard
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex flex-col w-full max-w-3xl mx-auto h-full gap-8 py-4">

            {/* Header */}
            <div className="text-center shrink-0">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">File Official Complaint</h1>
                <p className="text-slate-500 font-medium mt-2">Submit preliminary reports securely to the centralized police database.</p>
            </div>

            {/* Top Progress Bar */}
            <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm shrink-0">
                <div className="flex items-center justify-between relative">
                    {/* Background Progress Line */}
                    <div className="absolute left-10 right-10 top-1/2 -translate-y-1/2 h-1 bg-slate-100 z-0 rounded-full" />
                    {/* Active Progress Line */}
                    <div
                        className="absolute left-10 top-1/2 -translate-y-1/2 h-1 bg-teal-500 z-0 rounded-full transition-all duration-500"
                        style={{ width: `${((activeStep - 1) / (steps.length - 1)) * 100}%`, maxWidth: 'calc(100% - 80px)' }}
                    />

                    {steps.map((step) => {
                        const isActive = step.id === activeStep;
                        const isPast = step.id < activeStep;

                        return (
                            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center border-4 transition-colors duration-300
                                    ${isActive ? 'bg-teal-600 border-teal-100 text-white scale-110 shadow-sm' :
                                        isPast ? 'bg-teal-500 border-white text-white' : 'bg-white border-slate-100 text-slate-400'}
                                `}>
                                    {isPast ? <CheckCircle2 className="w-5 h-5" /> : <step.icon className="w-5 h-5" />}
                                </div>
                                <span className={`text-xs font-bold uppercase tracking-wider ${isActive ? 'text-teal-700' : 'text-slate-400'}`}>
                                    {step.title}
                                </span>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Form Container */}
            <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm flex-1 flex flex-col relative overflow-hidden">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="flex-1 space-y-6"
                    >
                        {activeStep === 1 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Legal Name</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        placeholder="As per official ID"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        placeholder="+91"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {activeStep === 2 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Incident Type</label>
                                    <select
                                        name="incidentType"
                                        value={formData.incidentType}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium transition-all"
                                        style={{ WebkitAppearance: 'none' }}
                                    >
                                        <option value="" disabled>Select category...</option>
                                        <option>Theft / Burglary</option>
                                        <option>Cyber Crime</option>
                                        <option>Assault / Harassment</option>
                                        <option>Traffic Violation / Accident</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Date & Time of Incident</label>
                                    <input
                                        type="datetime-local"
                                        name="dateTime"
                                        value={formData.dateTime}
                                        onChange={handleChange}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        {activeStep === 3 && (
                            <div className="flex flex-col h-full space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Incident Description</label>
                                    <textarea
                                        rows="5"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleChange}
                                        placeholder="Provide a detailed, chronological account of the events. Please be as specific as possible regarding locations, persons involved, and sequence of events."
                                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 font-medium transition-all resize-none"
                                    ></textarea>
                                </div>

                                {errorMsg && (
                                    <div className="mt-2 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                                        <AlertTriangle className="w-5 h-5 text-red-600 shrink-0" />
                                        <p className="text-sm font-bold text-red-900">{errorMsg}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>

                {/* Footer Controls */}
                <div className="shrink-0 mt-8 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <button
                        onClick={handleBack}
                        disabled={activeStep === 1 || isSubmitting}
                        className="px-6 py-3 rounded-xl font-bold text-slate-500 hover:text-slate-800 hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-slate-500"
                    >
                        {activeStep === 1 ? 'Save as Draft' : 'Back'}
                    </button>

                    {activeStep < 3 ? (
                        <button
                            onClick={handleNext}
                            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2"
                        >
                            Next Step <ChevronRight className="w-4 h-4 ml-1" />
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-sm hover:shadow-md transition-all flex items-center gap-2 disabled:bg-slate-300 disabled:shadow-none min-w-[200px] justify-center"
                        >
                            {isSubmitting ? (
                                <>Submitting...</>
                            ) : (
                                <>Submit Application <CheckCircle2 className="w-4 h-4 ml-1" /></>
                            )}
                        </button>
                    )}
                </div>

            </div>

        </div>
    );
}
