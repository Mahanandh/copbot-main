import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Scale, FileSignature, ChevronDown } from 'lucide-react';
import { CopBotAPI } from '../services/api';

export default function LegalPage() {
    const [sections, setSections] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(true);
    const [expandedId, setExpandedId] = useState(null);

    useEffect(() => {
        const fetchLegalData = async () => {
            try {
                const data = await CopBotAPI.getLegalSections();
                setSections(data);
            } catch (error) {
                setSections([
                    { section_name: "Section 154 CrPC", description: "Information in cognizable cases. Every information relating to the commission of a cognizable offence, if given orally to an officer in charge of a police station, shall be reduced to writing by him..." },
                    { section_name: "Section 166A IPC", description: "Public servant disobeying direction under law. Whoever, being a public servant, knowingly disobeys any direction of the law which prohibits him from requiring the attendance at any place of any person..." },
                    { section_name: "Section 354 IPC", description: "Assault or criminal force to woman with intent to outrage her modesty." }
                ]);
            } finally {
                setLoading(false);
            }
        };
        fetchLegalData();
    }, []);

    const filteredSections = sections.filter(sec =>
        sec.section_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        sec.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col h-full gap-6">

            {/* Header */}
            <div className="shrink-0 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-3">Citizens' Legal Directory</h1>
                <p className="text-slate-600 font-medium max-w-2xl mx-auto">Browse fundamental rights, IPC sections, and procedural frameworks. Knowledge is your strongest defense.</p>
            </div>

            {/* Search Bar */}
            <div className="relative shrink-0 max-w-2xl mx-auto w-full">
                <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-slate-400" />
                </div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by keyword (e.g., 'FIR', 'Harassment', 'Section 154')..."
                    className="w-full bg-white border border-slate-200 shadow-sm rounded-2xl py-4 pl-12 pr-4 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium text-lg"
                />
            </div>

            {/* Legal List */}
            <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide pb-10">
                {loading ? (
                    <div className="space-y-4 animate-pulse">
                        {[...Array(4)].map((_, i) => (
                            <div key={i} className="h-20 bg-white rounded-2xl border border-slate-100 shadow-sm" />
                        ))}
                    </div>
                ) : filteredSections.length > 0 ? (
                    filteredSections.map((sec, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden"
                        >
                            <button
                                onClick={() => setExpandedId(expandedId === idx ? null : idx)}
                                className="w-full text-left p-5 flex items-center justify-between hover:bg-slate-50 transition-colors"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                                        <Scale className="w-5 h-5 text-slate-600" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{sec.section_name}</h3>
                                </div>
                                <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${expandedId === idx ? 'rotate-180' : ''}`} />
                            </button>

                            <AnimatePresence>
                                {expandedId === idx && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-slate-50 border-t border-slate-100"
                                    >
                                        <div className="p-6 text-slate-700 font-medium leading-relaxed pl-[72px] flex gap-4">
                                            <FileSignature className="w-5 h-5 text-teal-600 shrink-0 mt-1" />
                                            <p>{sec.description}</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))
                ) : (
                    <div className="text-center py-20 text-slate-500">
                        <Scale className="w-12 h-12 mx-auto mb-4 opacity-20" />
                        <p className="text-lg font-semibold">No legal sections found matching your query.</p>
                    </div>
                )}
            </div>

        </div>
    );
}
