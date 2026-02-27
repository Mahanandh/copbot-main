import { useState } from 'react';
import { Send, Mic } from 'lucide-react';

export default function InputBox({ onSendMessage, disabled }) {
    const [text, setText] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && !disabled) {
            onSendMessage(text);
            setText('');
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit(e);
        }
    };

    return (
        <div className="p-4 bg-white border-t border-slate-200 shrink-0">
            <div className="max-w-4xl mx-auto relative">
                <form onSubmit={handleSubmit} className="relative flex items-end shadow-sm border border-slate-300 rounded-xl overflow-hidden bg-white focus-within:ring-2 focus-within:ring-[#1E3A8A]/20 focus-within:border-[#1E3A8A] transition-all">

                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Type your message to CopBot..."
                        disabled={disabled}
                        rows={1}
                        className="w-full max-h-32 min-h-[56px] py-4 pl-4 pr-24 resize-none bg-transparent focus:outline-none text-slate-800 placeholder-slate-400 text-[15px]"
                        style={{ height: 'auto', overflowY: 'auto' }}
                    />

                    <div className="absolute right-2 bottom-2 flex items-center gap-1 bg-white">
                        <button
                            type="button"
                            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Voice Input (Coming Soon)"
                        >
                            <Mic className="w-5 h-5" />
                        </button>
                        <button
                            type="submit"
                            disabled={disabled || !text.trim()}
                            className="p-2 bg-[#1E3A8A] text-white rounded-lg hover:bg-blue-800 disabled:opacity-50 disabled:bg-slate-200 disabled:text-slate-400 transition-colors"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>

                </form>
                <p className="text-center text-xs text-slate-400 mt-2">
                    CopBot can make mistakes. Always verify critical legal or emergency information.
                </p>
            </div>
        </div>
    );
}
