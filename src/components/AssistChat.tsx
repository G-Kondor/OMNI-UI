import { useState } from 'react';

interface SuggestedPrompt {
  text: string;
}

interface AssistMessage {
  id: string;
  type: 'user' | 'assistant';
  text: string;
  timestamp?: string;
  status?: {
    label: string;
    variant: 'active' | 'pending';
  };
  eta?: string;
  actions?: Array<{
    label: string;
    onClick?: () => void;
  }>;
}

interface ActionTaken {
  label: string;
  status: 'active' | 'pending';
}

interface AssistChatProps {
  contextChip: string;
  suggestedPrompts: SuggestedPrompt[];
  messages?: AssistMessage[];
  actionsTaken?: ActionTaken[];
  isOpen?: boolean;
  onToggle?: () => void;
}

const AIIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="url(#paint0_linear_ai)"/>
    <path d="M16 8L18.1496 13.8504L24 16L18.1496 18.1496L16 24L13.8504 18.1496L8 16L13.8504 13.8504L16 8Z" fill="white"/>
    <defs>
      <linearGradient id="paint0_linear_ai" x1="0" y1="16" x2="32" y2="16" gradientUnits="userSpaceOnUse">
        <stop stopColor="#2B6BF5"/>
        <stop offset="1" stopColor="#7C4DFF"/>
      </linearGradient>
    </defs>
  </svg>
);

const SparkleIcon = () => (
  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 0L5.0748 2.9252L8 4L5.0748 5.0748L4 8L2.9252 5.0748L0 4L2.9252 2.9252L4 0Z" fill="#2B6BF5"/>
  </svg>
);

const AvatarIcon = () => (
  <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="22" height="22" rx="11" fill="#EEF3FF"/>
    <path d="M11 6L12.3435 9.6565L16 11L12.3435 12.3435L11 16L9.6565 12.3435L6 11L9.6565 9.6565L11 6Z" fill="#2B6BF5"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 4L10 8L6 12" stroke="#2B6BF5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 8L2 14L4 8L2 2L14 8Z" fill="white"/>
  </svg>
);

export default function AssistChat({ 
  contextChip, 
  suggestedPrompts, 
  messages = [],
  actionsTaken = [],
  isOpen = true,
  onToggle
}: AssistChatProps) {
  const [inputValue, setInputValue] = useState('');

  if (!isOpen) return null;

  return (
    <div className="w-[340px] bg-white border-r border-[#e0e5ed] flex flex-col h-full shrink-0 xl:w-[340px] lg:w-[300px]">
      {/* Header */}
      <div className="px-4 py-4 border-b border-[#e0e5ed]">
        <div className="flex items-center gap-3">
          <AIIcon />
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-[14px] font-semibold text-[#171c29]">OMNI Assist</span>
              <span className="bg-[#e5edff] text-[#2e6bfa] text-[10px] font-medium px-[6px] py-[2px] rounded">+ AI</span>
              <button 
                onClick={onToggle}
                className="ml-auto text-[11px] text-[#6b7385] border border-[#e0e5ed] px-2 py-1 rounded hover:bg-gray-50"
              >
                {contextChip}
              </button>
            </div>
            <span className="text-[11px] text-[#6b7385]">Act on this screen by chat</span>
          </div>
        </div>
      </div>

      {/* Suggested prompts */}
      <div className="px-4 py-3 border-b border-[#e0e5ed]">
        <span className="text-[10px] text-[#6b7385] font-medium uppercase">Suggested for this screen</span>
        <div className="flex flex-col gap-2 mt-3">
          {suggestedPrompts.map((prompt, i) => (
            <button 
              key={i} 
              className="flex items-center gap-2 text-left text-[12px] text-[#2e6bfa] hover:bg-[#f7faff] p-2 rounded-lg transition-colors group"
            >
              <span className="text-[#2e6bfa]">+</span>
              <SparkleIcon />
              <span className="flex-1">{prompt.text}</span>
              <ArrowIcon />
            </button>
          ))}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-3">
        {messages.map((msg) => (
          <div key={msg.id}>
            {msg.timestamp && (
              <div className="flex items-center justify-center my-3">
                <span className="text-[10px] text-[#6b7385]">{msg.timestamp}</span>
              </div>
            )}
            {msg.type === 'user' ? (
              <div className="flex justify-end mb-3">
                <div className="bg-[#f0f3f7] text-[#171c29] text-[12px] px-3 py-2 rounded-lg max-w-[260px]">
                  {msg.text}
                </div>
              </div>
            ) : (
              <div className="flex gap-2 mb-3">
                <div className="shrink-0 mt-1">
                  <AvatarIcon />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <div className="bg-white border border-[#e0e5ed] rounded-lg p-3">
                    <p className="text-[12px] text-[#171c29] leading-[1.5]">{msg.text}</p>
                    {msg.status && (
                      <div className="flex items-center gap-2 mt-2">
                        <span className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                          msg.status.variant === 'active' 
                            ? 'text-[#219e66]' 
                            : 'text-[#d9851a]'
                        }`}>
                          <span className={`w-[6px] h-[6px] rounded-full ${
                            msg.status.variant === 'active' 
                              ? 'bg-[#219e66]' 
                              : 'bg-[#d9851a]'
                          }`} />
                          {msg.status.label}
                        </span>
                        {msg.eta && (
                          <span className="text-[11px] text-[#6b7385]">{msg.eta}</span>
                        )}
                      </div>
                    )}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex gap-2 mt-2">
                        {msg.actions.map((action, i) => (
                          <button 
                            key={i}
                            onClick={action.onClick}
                            className="text-[11px] text-[#2e6bfa] hover:underline"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Composer */}
      <div className="px-4 py-3 border-t border-[#e0e5ed]">
        <div className="flex items-center gap-2 bg-[#f5f7fa] rounded-lg px-3 py-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Ask OMNI to..."
            className="flex-1 bg-transparent text-[13px] text-[#171c29] placeholder-[#8c94a6] outline-none"
          />
          <button className="w-[28px] h-[28px] bg-[#2e6bfa] rounded-full flex items-center justify-center hover:bg-[#2559d4] transition-colors">
            <SendIcon />
          </button>
        </div>
        <p className="text-[10px] text-[#8c94a6] mt-2 leading-[1.4]">
          Actions run with your Cast AI role · risky changes ask for approval.
        </p>
      </div>

      {/* Actions taken footer */}
      {actionsTaken.length > 0 && (
        <div className="px-4 py-3 border-t border-[#e0e5ed] bg-[#f9fafb]">
          <span className="text-[10px] text-[#6b7385] font-medium uppercase">Actions Taken</span>
          <div className="flex flex-wrap gap-2 mt-2">
            {actionsTaken.map((action, i) => (
              <span 
                key={i}
                className={`inline-flex items-center gap-1 text-[11px] font-medium ${
                  action.status === 'active' 
                    ? 'text-[#219e66]' 
                    : 'text-[#d9851a]'
                }`}
              >
                <span className={`w-[6px] h-[6px] rounded-full ${
                  action.status === 'active' 
                    ? 'bg-[#219e66]' 
                    : 'bg-[#d9851a]'
                }`} />
                {action.label}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
