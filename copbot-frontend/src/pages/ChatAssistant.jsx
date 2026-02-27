import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, Shield, Sparkles, AlertCircle } from 'lucide-react';
import { AI_API } from '../services/apiService';

export default function ChatAssistant() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            sender: 'ai',
            text: 'Hello. I am the CopBot automated intelligence. How can I assist you with legal guidance or filing a report today?',
            isGuidance: true
        }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async (e) => {
        e?.preventDefault();
        if (!input.trim() || isTyping) return;

        const userMsg = input.trim();
        setInput('');

        // Add User Message
        const userMessageObj = { id: Date.now(), sender: 'user', text: userMsg };
        setMessages(prev => [...prev, userMessageObj]);
        setIsTyping(true);

        try {
            // API call to the Flask backend /api/chat/chat
            const data = await AI_API.sendChatMessage(userMsg);

            const aiMessageObj = {
                id: Date.now() + 1,
                sender: 'ai',
                text: data.response
            };
            setMessages(prev => [...prev, aiMessageObj]);
        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                sender: 'ai',
                text: "System communication error. Cannot reach AI processing core. Let me load the offline legal database.",
                isError: true
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    return (
        <div className="flex-1 w-full max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)] shadow-sm bg-white rounded-3xl border border-slate-200 overflow-hidden">

            {/* Header */}
            <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between z-10 shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center border border-teal-100">
                        <Shield className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                        <h2 className="text-slate-900 font-bold flex items-center gap-2 tracking-tight">
                            Intelligence Core
                            <span className="flex h-2 w-2 relative">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
                            </span>
                        </h2>
                        <p className="text-xs font-semibold text-slate-500">RAG-enabled Mistral-7B System</p>
                    </div>
                </div>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-hide bg-slate-50">
                <AnimatePresence initial={false}>
                    {messages.map((msg) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[85%] ${msg.sender === 'user' ? 'ml-auto' : 'mr-auto'}`}
                        >
                            {/* Sender Name/Icon inside the bubble layout */}
                            <div className={`flex items-center gap-2 mb-1 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${msg.sender === 'user' ? 'bg-slate-300' : 'bg-teal-100 border border-teal-200'}`}>
                                    {msg.sender === 'user' ? <span className="text-[10px] font-bold text-slate-700">ME</span> : <Sparkles className="w-3 h-3 text-teal-600" />}
                                </div>
                                <span className="text-xs font-bold text-slate-500">{msg.sender === 'user' ? 'Citizen' : 'CopBot Agent'}</span>
                            </div>

                            {/* Message Bubble */}
                            <div
                                className={`
                  relative px-5 py-4 rounded-2xl text-sm leading-relaxed shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)]
                  ${msg.sender === 'user'
                                        ? 'bg-slate-800 border border-slate-700 text-white rounded-tr-sm'
                                        : msg.isError
                                            ? 'bg-red-50 border border-red-200 text-red-900 rounded-tl-sm'
                                            : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm'
                                    }
                `}
                            >
                                <span className="font-medium">{msg.text}</span>

                                {/* Decorative border for AI */}
                                {msg.sender === 'ai' && !msg.isError && (
                                    <div className="absolute inset-x-0 bottom-0 h-1 bg-teal-500 rounded-b-2xl rounded-tr-none" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-start max-w-[85%] mr-auto gap-2"
                    >
                        <div className="w-6 h-6 rounded-full bg-teal-100 border border-teal-200 flex items-center justify-center mt-6">
                            <Sparkles className="w-3 h-3 text-teal-600 animate-pulse" />
                        </div>
                        <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-5 py-4 flex items-center gap-1 shadow-sm mt-6">
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                            <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-bounce"></span>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white border-t border-slate-200 p-4 shrink-0 z-10">
                <form onSubmit={handleSend} className="relative flex items-center">
                    <button
                        type="button"
                        className="absolute left-3 w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-400 transition-colors"
                    >
                        <Mic className="w-5 h-5" />
                    </button>

                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Describe your situation or ask for legal advice..."
                        className="w-full bg-slate-50 border border-slate-200 shadow-sm rounded-2xl py-4 pl-14 pr-16 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 transition-all font-medium"
                        disabled={isTyping}
                    />

                    <button
                        type="submit"
                        disabled={!input.trim() || isTyping}
                        className="absolute right-3 w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400 text-white flex items-center justify-center transition-all shadow-sm"
                    >
                        <Send className="w-5 h-5 ml-0.5" />
                    </button>
                </form>
                <p className="text-center mt-3 text-[10px] text-slate-500 font-semibold tracking-wide">
                    <AlertCircle className="w-3 h-3 inline mr-1 -mt-0.5" />
                    AI outputs should not replace official legal counsel.
                </p>
            </div>
        </div>
    );
}
