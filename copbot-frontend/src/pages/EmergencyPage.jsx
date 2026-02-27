import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Phone, ShieldAlert, Siren, Crosshair, MapPin } from 'lucide-react';
import { CopBotAPI } from '../services/api';

export default function EmergencyPage() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sosSent, setSosSent] = useState(false);

    useEffect(() => {
        const fetchContacts = async () => {
            try {
                const data = await CopBotAPI.getEmergencyContacts();
                setContacts(data);
            } catch (error) {
                // Fallback data if API fails
                setContacts([
                    { name: "Police Control Room", phone: "100", description: "Immediate law enforcement assistance" },
                    { name: "Ambulance", phone: "108", description: "Medical emergencies" },
                    { name: "Women's Helpline", phone: "1091", description: "Domestic abuse & harassment" },
                    { name: "Cyber Crime", phone: "1930", description: "Financial fraud & cyber threats" },
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchContacts();
    }, []);

    const handleSOS = () => {
        setSosSent(true);
        // In a real app, this would hit an API and access GPS
        setTimeout(() => {
            setSosSent(false);
        }, 5000);
    };

    return (
        <div className="flex-1 w-full max-w-5xl mx-auto flex flex-col gap-6 h-full relative">

            <div className="text-center shrink-0 z-10 pt-4">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center justify-center gap-3">
                    <ShieldAlert className="w-10 h-10 text-red-600" />
                    Emergency Command
                </h1>
                <p className="text-slate-600 font-medium mt-2">Critical response active. Misuse is punishable by law.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 flex-1 z-10 pb-10">

                {/* BIG RED SOS BUTTON */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="md:w-1/2 bg-white rounded-3xl border border-red-100 shadow-sm p-8 flex flex-col items-center justify-center relative overflow-hidden group"
                >
                    {sosSent && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 bg-red-50/90 backdrop-blur-sm z-20 flex flex-col items-center justify-center border border-red-200"
                        >
                            <Siren className="w-16 h-16 text-red-600 animate-pulse mb-4" />
                            <h2 className="text-2xl font-bold text-red-900 tracking-widest uppercase mb-1">SOS Dispatched</h2>
                            <p className="text-red-700 text-sm font-semibold">GPS location shared • ETA 4 mins</p>
                        </motion.div>
                    )}

                    <div className="absolute top-4 left-4 flex items-center gap-2 text-red-400 text-xs font-mono font-bold">
                        <Crosshair className="w-4 h-4" /> TRK-GPS-LOCKED
                    </div>

                    <div className="relative">
                        <div className="absolute inset-0 bg-red-100 blur-3xl rounded-full scale-150 group-hover:bg-red-200 transition-all animate-pulse-subtle" />
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={handleSOS}
                            className="relative w-64 h-64 rounded-full bg-red-600 shadow-[0_10px_30px_rgba(220,38,38,0.3)] border-4 border-red-100 flex flex-col items-center justify-center hover:scale-105 transition-transform"
                        >
                            <span className="text-5xl font-black text-white tracking-widest uppercase mb-1 mt-4">SOS</span>
                            <span className="text-red-100 text-sm uppercase tracking-widest font-bold flex items-center gap-1">
                                <MapPin className="w-3 h-3" /> Tap to Broadcast
                            </span>
                        </motion.button>
                    </div>
                    <p className="mt-12 text-center text-sm font-medium text-slate-600 max-w-xs">
                        Instantly alerts the nearest patrol unit and sends your live GPS coordinates.
                    </p>
                </motion.div>

                {/* Directory List */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="md:w-1/2 flex flex-col gap-4 h-full"
                >
                    <div className="bg-slate-100 rounded-2xl p-4 border border-slate-200 flex items-center justify-between shrink-0">
                        <h3 className="text-slate-800 font-bold">Priority Connect</h3>
                        <span className="text-xs px-2 py-1 font-bold rounded bg-white border border-slate-200 text-slate-500 shadow-sm">Tap to dial</span>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-hide">
                        {loading ? (
                            <div className="animate-pulse space-y-3">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="h-24 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                                ))}
                            </div>
                        ) : (
                            contacts.map((contact, idx) => (
                                <motion.a
                                    href={`tel:${contact.phone}`}
                                    key={idx}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`
                  block p-5 rounded-2xl border transition-all relative overflow-hidden group shadow-sm
                  ${contact.phone === '100' || contact.phone === '108'
                                            ? 'bg-red-50 border-red-200 hover:bg-red-100'
                                            : 'bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300'
                                        }
                `}
                                >
                                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black/5 to-transparent flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Phone className={`w-8 h-8 ${contact.phone === '100' || contact.phone === '108' ? 'text-red-600' : 'text-slate-400'}`} />
                                    </div>

                                    <div className="flex justify-between items-center mb-1">
                                        <h4 className={`text-xl font-bold tracking-wide ${contact.phone === '100' || contact.phone === '108' ? 'text-red-900' : 'text-slate-800'}`}>{contact.name}</h4>
                                        <span className={`text-2xl font-black ${contact.phone === '100' || contact.phone === '108' ? 'text-red-600' : 'text-teal-600'}`}>
                                            {contact.phone}
                                        </span>
                                    </div>
                                    <p className={`text-sm font-medium w-3/4 ${contact.phone === '100' || contact.phone === '108' ? 'text-red-700' : 'text-slate-500'}`}>{contact.description}</p>
                                </motion.a>
                            ))
                        )}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
