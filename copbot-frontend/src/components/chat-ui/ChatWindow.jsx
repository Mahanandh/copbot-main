import { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import MessageBubble from './MessageBubble';
import InputBox from './InputBox';

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: 'bot',
            content: 'Hello. I am CopBot, your AI Police Assistant. How can I help you today? You can ask me about legal rights, how to file an FIR, or get emergency contacts.',
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto-scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);

    const handleSendMessage = (text) => {
        const newUserMsg = { id: Date.now(), role: 'user', content: text };
        setMessages(prev => [...prev, newUserMsg]);
        setIsTyping(true);

        // Mock bot response
        setTimeout(() => {
            setIsTyping(false);
            const newBotMsg = {
                id: Date.now() + 1,
                role: 'bot',
                content: `I've received your message: "${text}". I am currently operating in a simulated environment. In a real scenario, I would process this through our secure RAG pipeline to give you accurate legal or procedural advice.`,
            };
            setMessages(prev => [...prev, newBotMsg]);
        }, 1500);
    };

    return (
        <div className="flex h-screen w-full bg-[#F1F5F9] font-sans antialiased overflow-hidden">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Chat Area */}
            <main className="flex-1 flex flex-col min-w-0 h-full">
                <Header />

                {/* Chat History */}
                <div className="flex-1 overflow-y-auto px-4 py-8 md:px-8">
                    <div className="max-w-4xl mx-auto">
                        {messages.map((msg) => (
                            <MessageBubble key={msg.id} message={msg} />
                        ))}

                        {isTyping && (
                            <div className="flex w-full justify-start mb-6">
                                <div className="flex gap-4 max-w-[80%] md:max-w-[70%] flex-row">
                                    <div className="w-8 h-8 rounded-sm bg-[#1E3A8A] text-white flex items-center justify-center shrink-0 mt-1">
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce mx-1" style={{ animationDelay: '150ms' }} />
                                        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                                    </div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* Input Area */}
                <InputBox onSendMessage={handleSendMessage} disabled={isTyping} />
            </main>

        </div>
    );
}
