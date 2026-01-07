import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Sparkles, StopCircle, ArrowLeft, Bot, BookOpen, Library, X, Mail, Phone, MessageSquare } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useSmoothScroll } from '../App';

const Chatbot = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { scroll } = useSmoothScroll();

    // Initial State
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: "Hi! I'm your **Academio AI Tutor**. \nI can help you with IGCSE or IB subjects. What are we learning today?",
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [questionCount, setQuestionCount] = useState(0);
    const [showContactModal, setShowContactModal] = useState(false);

    // Refs
    const messagesEndRef = useRef(null);
    const textareaRef = useRef(null);
    const hasProcessedInitialQuestion = useRef(false);

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
        }
    }, [input]);

    // Scroll Logic
    const scrollToBottom = () => {
        if (scroll) {
            const container = document.getElementById('chat-messages-container');
            if (container) {
                scroll.scrollTo(container.scrollHeight, {
                    duration: 0.8,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
                });
            }
        } else {
            messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
        }
    };

    const forceScrollToBottom = () => {
        const container = document.getElementById('chat-messages-container');
        if (container) {
            if (scroll) {
                container.scrollTop = container.scrollHeight;
            } else {
                setTimeout(() => {
                    container.scrollTop = container.scrollHeight;
                }, 100);
            }
        }
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
        forceScrollToBottom();
    }, [messages, isLoading]);

    // Handle initial question
    useEffect(() => {
        if (location.state?.initialQuestion && !hasProcessedInitialQuestion.current) {
            hasProcessedInitialQuestion.current = true;
            handleSend(location.state.initialQuestion);
            window.history.replaceState({}, document.title);
        }
    }, [location.state]);

    const handleSend = async (text) => {
        const messageText = text || input;
        if (!messageText.trim()) return;

        const userMsg = { id: Date.now(), text: messageText, sender: 'user', timestamp: new Date() };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        if (textareaRef.current) textareaRef.current.style.height = 'auto';
        setIsLoading(true);

        // Increment question count for user messages
        const newQuestionCount = questionCount + 1;
        setQuestionCount(newQuestionCount);

        // Show contact modal after 3-4 questions
        if (newQuestionCount >= 3 && newQuestionCount <= 4) {
            setTimeout(() => {
                setShowContactModal(true);
            }, 2000);
        }

        try {
            const response = await fetch('http://localhost:5000/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: messageText }),
            });

            const data = await response.json();

            if (response.ok) {
                const botMsg = { id: Date.now() + 1, text: data.reply, sender: 'bot', timestamp: new Date() };
                setMessages(prev => [...prev, botMsg]);
                setTimeout(() => forceScrollToBottom(), 100);
            } else {
                throw new Error("Backend error");
            }

        } catch (error) {
            const errorMsg = {
                id: Date.now() + 1,
                text: "I'm having trouble connecting to the server. Please try again.",
                sender: 'bot',
                isError: true,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, errorMsg]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const suggestions = [
        "Explain Quantum Physics",
        "IGCSE Math Formulas",
        "Analyze Macbeth's themes",
        "IB Biology: Cell Structure"
    ];

    return (
        // Changed bg-slate-50 to bg-stone-50 for a warmer, paper-like feel
        <div className="flex flex-col h-screen bg-stone-50 font-sans text-slate-800 overflow-hidden pt-20 relative">

            {/* Background Pattern - Graph Paper Effect */}
            <div className="absolute inset-0 z-0 opacity-[0.4] pointer-events-none"
                 style={{
                     backgroundImage: 'radial-gradient(#a8a29e 1px, transparent 1px)',
                     backgroundSize: '24px 24px'
                 }}>
            </div>

            {/* Chat Header */}
            <header className="bg-white/80 backdrop-blur-md border-b border-stone-200 px-4 py-4 sticky top-0 z-20">
                <div className="max-w-3xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => navigate('/')}
                            className="p-2 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                        >
                            <ArrowLeft className="w-5 h-5 text-stone-600" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                                <Library className="w-5 h-5 text-emerald-700" />
                            </div>
                            <div>
                                <h1 className="text-lg font-bold text-slate-900 tracking-tight">Academio Tutor</h1>
                                <p className="text-xs text-stone-500 font-medium">Study Assistant • Online</p>
                            </div>
                        </div>
                    </div>
                    {/* Visual Indicator for connection */}
                    <div className="flex items-center gap-2 px-3 py-1 bg-emerald-50 rounded-full border border-emerald-100">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
                        <span className="text-[10px] font-semibold text-emerald-700 uppercase tracking-wider">Active</span>
                    </div>
                </div>
            </header>

            {/* Chat Area */}
            <main
                className="flex-1 overflow-y-auto px-4 pt-6 pb-32 relative z-10"
                id="chat-messages-container"
                data-lenis-prevent="false"
            >
                <div className="max-w-3xl mx-auto space-y-6">

                    <AnimatePresence initial={false}>
                        {messages.map((msg) => (
                            <motion.div
                                key={msg.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                            >
                                <div className={`flex gap-3 max-w-[90%] md:max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>

                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center shadow-sm border mt-1 ${
                                        msg.sender === 'user'
                                            ? 'bg-slate-800 border-slate-700 text-white'
                                            : 'bg-white border-stone-200 text-emerald-600'
                                    }`}>
                                        {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                                    </div>

                                    {/* Bubble */}
                                    <div className={`relative px-5 py-3.5 text-[15px] leading-7 shadow-sm ${
                                        msg.sender === 'user'
                                            ? 'bg-slate-800 text-white rounded-[20px] rounded-tr-sm'
                                            : 'bg-white text-slate-700 rounded-[20px] rounded-tl-sm border border-stone-200'
                                    } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}>

                                        {msg.sender === 'bot' ? (
                                            <div className="prose prose-sm prose-stone max-w-none prose-p:leading-relaxed prose-pre:bg-stone-100 prose-pre:text-stone-800 prose-a:text-emerald-600 hover:prose-a:text-emerald-500">
                                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                            </div>
                                        ) : (
                                            <p className="whitespace-pre-wrap font-medium">{msg.text}</p>
                                        )}

                                        <span className={`text-[10px] block text-right mt-1 opacity-60 font-medium ${msg.sender === 'user' ? 'text-slate-300' : 'text-stone-400'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Loading State */}
                    {isLoading && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex justify-start pl-11"
                        >
                            <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-stone-200 shadow-sm flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></span>
                            </div>
                        </motion.div>
                    )}

                    {/* Empty State Suggestions */}
                    {messages.length === 1 && !isLoading && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pl-11 mt-4">
                            {suggestions.map((suggestion, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => handleSend(suggestion)}
                                    className="flex items-center gap-3 text-left px-4 py-3 bg-white hover:bg-emerald-50/50 border border-stone-200 hover:border-emerald-200 rounded-xl transition-all duration-200 shadow-sm hover:shadow-md group"
                                >
                                    <BookOpen className="w-4 h-4 text-emerald-600 opacity-60 group-hover:opacity-100 transition-opacity" />
                                    <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-800">{suggestion}</span>
                                </button>
                            ))}
                        </div>
                    )}

                    <div ref={messagesEndRef} className="h-4" />
                </div>
            </main>

            {/* Input Area */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-50 via-stone-50/90 to-transparent z-20">
                <div className="max-w-3xl mx-auto">
                    <div className="relative bg-white/90 backdrop-blur-sm rounded-[24px] shadow-[0_4px_20px_rgb(0,0,0,0.08)] border border-stone-200 hover:border-emerald-300 focus-within:ring-4 focus-within:ring-emerald-50/50 focus-within:border-emerald-500 transition-all duration-300 flex items-end p-2">
                        <textarea
                            ref={textareaRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Type your question..."
                            className="flex-1 max-h-40 bg-transparent border-0 focus:ring-0 p-3.5 text-slate-800 placeholder:text-stone-400 resize-none text-[15px] leading-6 scrollbar-hide font-medium"
                            rows={1}
                            style={{ minHeight: '48px' }}
                        />
                        <button
                            onClick={() => handleSend()}
                            disabled={!input.trim() || isLoading}
                            className={`p-3 rounded-xl mb-1 mr-1 transition-all duration-200 flex-shrink-0 flex items-center justify-center ${
                                input.trim() && !isLoading
                                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200 hover:scale-105 hover:bg-emerald-700 active:scale-95'
                                    : 'bg-stone-100 text-stone-300 cursor-not-allowed'
                            }`}
                        >
                            {isLoading ? (
                                <StopCircle className="w-5 h-5 animate-pulse" />
                            ) : (
                                <Send className="w-5 h-5 ml-0.5" />
                            )}
                        </button>
                    </div>
                    <p className="text-center text-[11px] text-stone-400 mt-3 font-medium tracking-wide">
                        Academio AI • Check important information
                    </p>
                </div>
            </div>

            {/* Contact Modal */}
            <AnimatePresence>
                {showContactModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        onClick={() => setShowContactModal(false)}
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-stone-200"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center border border-emerald-200">
                                        <MessageSquare className="w-5 h-5 text-emerald-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900">Need More Help?</h3>
                                        <p className="text-sm text-stone-500">Get personalized assistance</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="p-2 hover:bg-stone-100 rounded-lg transition-colors duration-200"
                                >
                                    <X className="w-4 h-4 text-stone-500" />
                                </button>
                            </div>

                            <div className="space-y-4 mb-6">
                                <p className="text-slate-700 text-sm leading-relaxed">
                                    You've been asking great questions! Would you like to connect with our team for more personalized learning support?
                                </p>

                                <div className="space-y-3">
                                    <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                                        <Mail className="w-4 h-4 text-emerald-600" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Email Support</p>
                                            <p className="text-xs text-stone-500">support@academio.com</p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-3 p-3 bg-stone-50 rounded-lg">
                                        <Phone className="w-4 h-4 text-emerald-600" />
                                        <div>
                                            <p className="text-sm font-medium text-slate-900">Phone Support</p>
                                            <p className="text-xs text-stone-500">+1 (555) 123-4567</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowContactModal(false)}
                                    className="flex-1 px-4 py-2.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg font-medium text-sm transition-colors duration-200"
                                >
                                    Maybe Later
                                </button>
                                <button
                                    onClick={() => {
                                        // Here you can add logic to open a contact form or redirect
                                        alert('Contact form would open here!');
                                        setShowContactModal(false);
                                    }}
                                    className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-medium text-sm transition-colors duration-200 shadow-lg shadow-emerald-200"
                                >
                                    Get in Touch
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Chatbot;