"use client";

import React from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';

export default function Contact() {
  return (
    <div className="h-full bg-[#1e1e2e] text-gray-200 flex flex-col items-center justify-center p-6 overflow-auto">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-gray-400">Send me a message or connect on social media.</p>
        </div>

        <form className="space-y-4 mb-8" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Name</label>
                <input 
                    type="text" 
                    className="w-full bg-[#313244] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
                    placeholder="John Doe"
                />
            </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Email</label>
                <input 
                    type="email" 
                    className="w-full bg-[#313244] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500"
                    placeholder="john@example.com"
                />
            </div>
             <div className="space-y-1">
                <label className="text-sm font-medium text-gray-300 ml-1">Message</label>
                <textarea 
                    rows={4}
                    className="w-full bg-[#313244] border border-white/10 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all placeholder-gray-500 resize-none"
                    placeholder="Hello there..."
                />
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                <Send size={18} />
                Send Message
            </button>
        </form>

        <div className="flex items-center justify-center gap-6 pt-6 border-t border-white/10">
             <a href="https://github.com/Hetav21" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1 group">
                <div className="p-3 bg-[#313244] rounded-full group-hover:bg-[#45475a] transition-colors">
                    <Github size={20} />
                </div>
                <span className="text-xs">GitHub</span>
            </a>
             <a href="https://linkedin.com/in/hetav2106/" target="_blank" rel="noopener noreferrer" 
               className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1 group">
                <div className="p-3 bg-[#313244] rounded-full group-hover:bg-[#45475a] transition-colors">
                    <Linkedin size={20} />
                </div>
                <span className="text-xs">LinkedIn</span>
            </a>
            <a href="mailto:hetav@example.com"
               className="text-gray-400 hover:text-white transition-colors flex flex-col items-center gap-1 group">
                <div className="p-3 bg-[#313244] rounded-full group-hover:bg-[#45475a] transition-colors">
                    <Mail size={20} />
                </div>
                <span className="text-xs">Email</span>
            </a>
        </div>
      </div>
    </div>
  );
}
