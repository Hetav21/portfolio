'use client';

import React, { useState } from 'react';
import { Send, Github, Linkedin, Mail } from 'lucide-react';

const TARGET_EMAIL = 'shahhetav2106@gmail.com';

export default function Contact() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSendEmail = () => {
    const encodedSubject = encodeURIComponent(subject || 'Hello from Portfolio');
    const encodedBody = encodeURIComponent(message);

    window.open(`mailto:${TARGET_EMAIL}?subject=${encodedSubject}&body=${encodedBody}`, '_self');
  };

  const isFormValid = message.trim().length > 0;

  return (
    <div className="h-full bg-card text-foreground flex flex-col items-center p-6 overflow-auto">
      <div className="w-full max-w-md pb-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-foreground mb-2">Get in Touch</h2>
          <p className="text-muted-foreground">Send me a message or connect on social media.</p>
        </div>

        <div className="space-y-4 mb-8">
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground ml-1">Subject</label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-muted-foreground"
              placeholder="Hello from Portfolio"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-foreground ml-1">Message</label>
            <textarea
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full bg-secondary border border-border rounded-lg px-4 py-2.5 text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all placeholder-muted-foreground resize-none"
              placeholder="Hello there..."
            />
          </div>
          <button
            onClick={handleSendEmail}
            disabled={!isFormValid}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send size={18} />
            Send Email
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 pt-6 border-t border-border">
          <a
            href="https://github.com/Hetav21"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 group"
          >
            <div className="p-3 bg-secondary rounded-full group-hover:bg-muted transition-colors">
              <Github size={20} />
            </div>
            <span className="text-xs">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/hetav2106/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 group"
          >
            <div className="p-3 bg-secondary rounded-full group-hover:bg-muted transition-colors">
              <Linkedin size={20} />
            </div>
            <span className="text-xs">LinkedIn</span>
          </a>
          <a
            href={`mailto:${TARGET_EMAIL}`}
            className="text-muted-foreground hover:text-foreground transition-colors flex flex-col items-center gap-1 group"
          >
            <div className="p-3 bg-secondary rounded-full group-hover:bg-muted transition-colors">
              <Mail size={20} />
            </div>
            <span className="text-xs">Email</span>
          </a>
        </div>
      </div>
    </div>
  );
}
