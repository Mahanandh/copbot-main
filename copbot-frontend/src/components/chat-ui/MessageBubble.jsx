import { Bot, User } from 'lucide-react';

export default function MessageBubble({ message }) {
    const isUser = message.role === 'user';

    return (
        <div className={`flex w-full ${isUser ? 'justify-end' : 'justify-start'} mb-6`}>
            <div className={`flex gap-4 max-w-[80%] md:max-w-[70%] ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>

                {/* Avatar */}
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center shrink-0 mt-1
          ${isUser ? 'bg-slate-200 text-slate-600' : 'bg-[#1E3A8A] text-white'}`}>
                    {isUser ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>

                {/* Message Content */}
                <div className="flex flex-col">
                    <span className={`text-sm font-semibold mb-1 ${isUser ? 'text-right text-slate-700' : 'text-slate-900'}`}>
                        {isUser ? 'You' : 'CopBot'}
                    </span>
                    <div className="text-slate-800 leading-relaxed text-[15px] whitespace-pre-wrap">
                        {message.content}
                    </div>
                </div>

            </div>
        </div>
    );
}
