import React, { useState, useEffect, useRef } from 'react';
import { Send, Bot, User, Zap, Calculator, FileText, Search, Clock, Code, MessageSquare } from 'lucide-react';
import AIAgent from '../aiAgent.js';

const Chat = () => {
  const [messages, setMessages] = useState([
    {
      type: 'agent',
      content: "Hello! I'm your AI Agent assistant. I can help you with calculations, file operations, web searches, text processing, time/weather information, and code generation. What would you like me to help you with?",
      timestamp: Date.now()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [agent] = useState(new AIAgent());
  const [showCapabilities, setShowCapabilities] = useState(false);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = {
      type: 'user',
      content: inputMessage,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      // Simulate typing delay
      setTimeout(async () => {
        const response = await agent.processMessage(inputMessage);
        
        const agentMessage = {
          type: 'agent',
          content: response,
          timestamp: Date.now()
        };

        setMessages(prev => [...prev, agentMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds

    } catch (error) {
      console.error('Error processing message:', error);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (content) => {
    // Simple markdown-like formatting
    const formatted = content
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 p-3 rounded-lg overflow-x-auto"><code>$2</code></pre>')
      .replace(/`(.*?)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>')
      .replace(/\n/g, '<br>');
    
    return formatted;
  };

  const capabilities = [
    { icon: Calculator, name: 'Calculator', description: 'Perform mathematical calculations' },
    { icon: FileText, name: 'File Operations', description: 'Handle file and folder operations' },
    { icon: Search, name: 'Web Search', description: 'Search for information' },
    { icon: MessageSquare, name: 'Text Processing', description: 'Analyze and process text' },
    { icon: Clock, name: 'Time & Weather', description: 'Get time and weather info' },
    { icon: Code, name: 'Code Generation', description: 'Generate code snippets' }
  ];

  const quickActions = [
    "Calculate 25 * 4 + 10",
    "What's the current time?",
    "Search for React hooks",
    "Count words in this message",
    "Generate a JavaScript function",
    "Create a new file"
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`${showCapabilities ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowCapabilities(!showCapabilities)}
            className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
          >
            <Zap className="w-6 h-6" />
            {showCapabilities && <span className="font-medium">Capabilities</span>}
          </button>
        </div>
        
        {showCapabilities && (
          <div className="flex-1 overflow-y-auto p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Agent Capabilities</h3>
                <div className="space-y-2">
                  {capabilities.map((capability, index) => (
                    <div key={index} className="flex items-start space-x-3 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                      <capability.icon className="w-5 h-5 text-primary-500 mt-0.5" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{capability.name}</div>
                        <div className="text-xs text-gray-600">{capability.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                <div className="space-y-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => setInputMessage(action)}
                      className="w-full text-left text-xs text-gray-600 hover:text-primary-600 p-2 rounded bg-gray-50 hover:bg-primary-50 transition-colors"
                    >
                      {action}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary-500 rounded-full flex items-center justify-center">
              <Bot className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">AI Agent Assistant</h1>
              <p className="text-sm text-gray-600">
                {isTyping ? 'Typing...' : 'Ready to help with various tasks'}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex items-start space-x-3 max-w-3xl ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' ? 'bg-primary-500' : 'bg-gray-200'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-5 h-5 text-white" />
                  ) : (
                    <Bot className="w-5 h-5 text-gray-600" />
                  )}
                </div>
                <div className={`message-bubble ${message.type === 'user' ? 'user-message' : 'agent-message'}`}>
                  <div
                    dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
                    className="text-sm leading-relaxed"
                  />
                  <div className={`text-xs mt-2 ${message.type === 'user' ? 'text-blue-100' : 'text-gray-500'}`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3 max-w-3xl">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-gray-600" />
                </div>
                <div className="message-bubble agent-message">
                  <div className="typing-indicator">
                    <div className="typing-dot" style={{ animationDelay: '0ms' }}></div>
                    <div className="typing-dot" style={{ animationDelay: '200ms' }}></div>
                    <div className="typing-dot" style={{ animationDelay: '400ms' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="bg-white border-t border-gray-200 p-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything... I can calculate, search, process text, and more!"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 resize-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows="1"
                style={{ 
                  minHeight: '50px',
                  maxHeight: '120px',
                  overflowY: inputMessage.split('\n').length > 3 ? 'scroll' : 'hidden'
                }}
              />
            </div>
            <button
              onClick={handleSendMessage}
              disabled={!inputMessage.trim() || isTyping}
              className="bg-primary-500 text-white p-3 rounded-lg hover:bg-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="mt-2 text-xs text-gray-500">
            Press Enter to send, Shift+Enter for new line
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;