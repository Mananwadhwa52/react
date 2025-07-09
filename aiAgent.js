class AIAgent {
  constructor() {
    this.capabilities = {
      calculator: new CalculatorCapability(),
      fileOps: new FileOperationsCapability(),
      webSearch: new WebSearchCapability(),
      textProcessor: new TextProcessorCapability(),
      timeWeather: new TimeWeatherCapability(),
      codeGenerator: new CodeGeneratorCapability()
    };
    
    this.context = {
      conversationHistory: [],
      userPreferences: {},
      currentSession: Date.now()
    };
  }

  async processMessage(message) {
    // Add user message to context
    this.context.conversationHistory.push({
      type: 'user',
      content: message,
      timestamp: Date.now()
    });

    try {
      // Analyze message intent
      const intent = this.analyzeIntent(message);
      
      // Route to appropriate capability
      const response = await this.routeToCapability(intent, message);
      
      // Add agent response to context
      this.context.conversationHistory.push({
        type: 'agent',
        content: response,
        timestamp: Date.now(),
        capability: intent.capability
      });

      return response;
    } catch (error) {
      const errorResponse = `I apologize, but I encountered an error: ${error.message}. Could you please try rephrasing your request?`;
      
      this.context.conversationHistory.push({
        type: 'agent',
        content: errorResponse,
        timestamp: Date.now(),
        error: true
      });

      return errorResponse;
    }
  }

  analyzeIntent(message) {
    const lowerMessage = message.toLowerCase();
    
    // Math/calculation patterns
    if (/calculate|compute|math|[\+\-\*\/\(\)0-9\s]+$|what is \d|solve/.test(lowerMessage)) {
      return { capability: 'calculator', confidence: 0.9 };
    }
    
    // File operations patterns
    if (/file|folder|directory|create|save|read|write|delete/.test(lowerMessage)) {
      return { capability: 'fileOps', confidence: 0.8 };
    }
    
    // Web search patterns
    if (/search|find|look up|what is|who is|when did|where is|how to/.test(lowerMessage)) {
      return { capability: 'webSearch', confidence: 0.7 };
    }
    
    // Text processing patterns
    if (/translate|summarize|analyze|count words|sentiment|format/.test(lowerMessage)) {
      return { capability: 'textProcessor', confidence: 0.8 };
    }
    
    // Time/weather patterns
    if (/time|date|weather|temperature|forecast/.test(lowerMessage)) {
      return { capability: 'timeWeather', confidence: 0.8 };
    }
    
    // Code generation patterns
    if (/code|function|script|program|algorithm|write.*code/.test(lowerMessage)) {
      return { capability: 'codeGenerator', confidence: 0.8 };
    }
    
    // Default to general conversation
    return { capability: 'general', confidence: 0.5 };
  }

  async routeToCapability(intent, message) {
    if (intent.capability === 'general') {
      return this.handleGeneralConversation(message);
    }
    
    const capability = this.capabilities[intent.capability];
    if (capability) {
      return await capability.execute(message, this.context);
    }
    
    return this.handleGeneralConversation(message);
  }

  handleGeneralConversation(message) {
    const responses = [
      "I understand you're asking about: " + message + ". How can I help you with that?",
      "That's an interesting point. Could you provide more details so I can assist you better?",
      "I'm here to help! I can perform calculations, file operations, searches, text processing, and more. What would you like me to do?",
      "Let me think about that... Could you be more specific about what you need help with?",
      "I'm an AI agent with various capabilities. Try asking me to calculate something, search for information, or process text!"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  }

  getCapabilities() {
    return Object.keys(this.capabilities).map(key => ({
      name: key,
      description: this.capabilities[key].description || `${key} capability`
    }));
  }
}

// Calculator Capability
class CalculatorCapability {
  constructor() {
    this.description = "Perform mathematical calculations and solve equations";
  }

  async execute(message, context) {
    try {
      // Extract mathematical expression
      const mathExpression = this.extractMathExpression(message);
      
      if (!mathExpression) {
        return "I couldn't find a mathematical expression in your message. Please provide a calculation like '2 + 2' or 'calculate 15 * 7'.";
      }
      
      // Safely evaluate the expression
      const result = this.safeEvaluate(mathExpression);
      
      return `The result of ${mathExpression} is: **${result}**`;
    } catch (error) {
      return `I couldn't calculate that. Please check your mathematical expression and try again.`;
    }
  }

  extractMathExpression(message) {
    // Look for mathematical patterns
    const mathPattern = /(?:calculate|compute|solve|what is)\s*([\d\+\-\*\/\(\)\.\s]+)|^([\d\+\-\*\/\(\)\.\s]+)$/i;
    const match = message.match(mathPattern);
    
    if (match) {
      return (match[1] || match[2]).trim();
    }
    
    return null;
  }

  safeEvaluate(expression) {
    // Remove any non-mathematical characters for safety
    const cleanExpression = expression.replace(/[^0-9\+\-\*\/\(\)\.\s]/g, '');
    
    try {
      // Use Function constructor for safer evaluation than eval
      return new Function('return ' + cleanExpression)();
    } catch (error) {
      throw new Error('Invalid mathematical expression');
    }
  }
}

// File Operations Capability
class FileOperationsCapability {
  constructor() {
    this.description = "Handle file and folder operations";
  }

  async execute(message, context) {
    const action = this.determineFileAction(message);
    
    switch (action.type) {
      case 'create':
        return `I can help you create ${action.target}. Here's what I would do:\n\n1. Create the file/folder\n2. Set appropriate permissions\n3. Add initial content if specified\n\n*Note: This is a simulation - in a real environment, I would perform the actual file operations.*`;
      
      case 'read':
        return `I would read the contents of ${action.target} and display them to you. The file would be opened and its contents processed for your review.`;
      
      case 'write':
        return `I would write the specified content to ${action.target}. The file would be created or updated with your new content.`;
      
      case 'delete':
        return `I would safely delete ${action.target} after confirming the operation with you. This ensures no accidental data loss.`;
      
      default:
        return "I can help you with file operations like creating, reading, writing, or deleting files and folders. What specific file operation would you like me to perform?";
    }
  }

  determineFileAction(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/create|make|new/.test(lowerMessage)) {
      return { type: 'create', target: this.extractTarget(message) };
    }
    if (/read|open|show|display/.test(lowerMessage)) {
      return { type: 'read', target: this.extractTarget(message) };
    }
    if (/write|save|update/.test(lowerMessage)) {
      return { type: 'write', target: this.extractTarget(message) };
    }
    if (/delete|remove/.test(lowerMessage)) {
      return { type: 'delete', target: this.extractTarget(message) };
    }
    
    return { type: 'unknown', target: null };
  }

  extractTarget(message) {
    // Simple extraction - in a real implementation, this would be more sophisticated
    const filePattern = /(?:file|folder|directory)\s+["']?([^"'\s]+)["']?/i;
    const match = message.match(filePattern);
    return match ? match[1] : "the specified file/folder";
  }
}

// Web Search Capability
class WebSearchCapability {
  constructor() {
    this.description = "Search for information and answer questions";
  }

  async execute(message, context) {
    const query = this.extractSearchQuery(message);
    
    // Simulate web search results
    const mockResults = this.getMockSearchResults(query);
    
    return `Here's what I found about "${query}":\n\n${mockResults}\n\n*Note: These are simulated results. In a real implementation, I would perform actual web searches and provide current information.*`;
  }

  extractSearchQuery(message) {
    // Remove common search phrases to get the core query
    return message
      .replace(/^(search for|find|look up|what is|who is|when did|where is|how to)\s*/i, '')
      .trim();
  }

  getMockSearchResults(query) {
    const mockData = {
      "artificial intelligence": "Artificial Intelligence (AI) refers to the simulation of human intelligence in machines that are programmed to think and learn like humans. It includes machine learning, neural networks, and deep learning technologies.",
      "javascript": "JavaScript is a programming language that enables interactive web pages and is an essential part of web applications. It's used for both frontend and backend development.",
      "react": "React is a JavaScript library for building user interfaces, particularly web applications. It was developed by Facebook and allows developers to create reusable UI components.",
      default: `Information about "${query}":\n\n• Key concepts and definitions\n• Current trends and developments\n• Practical applications\n• Related topics and resources`
    };
    
    const lowerQuery = query.toLowerCase();
    
    for (const [key, value] of Object.entries(mockData)) {
      if (key !== 'default' && lowerQuery.includes(key)) {
        return value;
      }
    }
    
    return mockData.default;
  }
}

// Text Processor Capability
class TextProcessorCapability {
  constructor() {
    this.description = "Process and analyze text content";
  }

  async execute(message, context) {
    const action = this.determineTextAction(message);
    const text = this.extractTextToProcess(message);
    
    switch (action) {
      case 'count':
        return this.countWords(text, message);
      case 'summarize':
        return this.summarizeText(text);
      case 'analyze':
        return this.analyzeText(text);
      case 'format':
        return this.formatText(text, message);
      default:
        return "I can help you process text in various ways: count words, summarize content, analyze sentiment, or format text. What would you like me to do?";
    }
  }

  determineTextAction(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/count|words|characters/.test(lowerMessage)) return 'count';
    if (/summarize|summary/.test(lowerMessage)) return 'summarize';
    if (/analyze|sentiment|emotion/.test(lowerMessage)) return 'analyze';
    if (/format|style|transform/.test(lowerMessage)) return 'format';
    
    return 'unknown';
  }

  extractTextToProcess(message) {
    // In a real implementation, this would extract text from quotes or context
    return message;
  }

  countWords(text, originalMessage) {
    const words = text.trim().split(/\s+/).length;
    const chars = text.length;
    
    return `Text analysis:\n• **${words}** words\n• **${chars}** characters\n• **${chars - text.replace(/\s/g, '').length}** spaces`;
  }

  summarizeText(text) {
    return `Here's a summary of the text:\n\n*This is a simulated summary. In a real implementation, I would use natural language processing to create an actual summary of the provided text.*\n\nKey points identified:\n• Main topic extraction\n• Important details\n• Core conclusions`;
  }

  analyzeText(text) {
    return `Text analysis results:\n\n**Sentiment**: Neutral to Positive\n**Tone**: Informative\n**Complexity**: Medium\n\n*This is a simulated analysis. Real implementation would use NLP models for accurate sentiment and tone analysis.*`;
  }

  formatText(text, originalMessage) {
    if (/uppercase|upper/.test(originalMessage.toLowerCase())) {
      return `Formatted text (UPPERCASE):\n\n${text.toUpperCase()}`;
    }
    if (/lowercase|lower/.test(originalMessage.toLowerCase())) {
      return `Formatted text (lowercase):\n\n${text.toLowerCase()}`;
    }
    
    return `I can format text in various ways:\n• UPPERCASE\n• lowercase\n• Title Case\n• And more formatting options`;
  }
}

// Time and Weather Capability
class TimeWeatherCapability {
  constructor() {
    this.description = "Provide time, date, and weather information";
  }

  async execute(message, context) {
    const lowerMessage = message.toLowerCase();
    
    if (/time/.test(lowerMessage)) {
      return this.getCurrentTime();
    }
    if (/date/.test(lowerMessage)) {
      return this.getCurrentDate();
    }
    if (/weather/.test(lowerMessage)) {
      return this.getWeatherInfo(message);
    }
    
    return "I can provide current time, date, and weather information. What would you like to know?";
  }

  getCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString();
    
    return `Current time: **${timeString}**\n\nTimezone: ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;
  }

  getCurrentDate() {
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    return `Today's date: **${dateString}**`;
  }

  getWeatherInfo(message) {
    // Mock weather data
    const mockWeather = {
      temperature: Math.floor(Math.random() * 30) + 10,
      condition: ['Sunny', 'Cloudy', 'Rainy', 'Partly Cloudy'][Math.floor(Math.random() * 4)],
      humidity: Math.floor(Math.random() * 40) + 40,
      location: 'Your Location'
    };
    
    return `Weather Information for ${mockWeather.location}:\n\n🌡️ **Temperature**: ${mockWeather.temperature}°C\n☁️ **Condition**: ${mockWeather.condition}\n💧 **Humidity**: ${mockWeather.humidity}%\n\n*Note: This is simulated weather data. Real implementation would use a weather API.*`;
  }
}

// Code Generator Capability
class CodeGeneratorCapability {
  constructor() {
    this.description = "Generate code snippets and programming solutions";
  }

  async execute(message, context) {
    const language = this.detectLanguage(message);
    const codeType = this.detectCodeType(message);
    
    return this.generateCode(language, codeType, message);
  }

  detectLanguage(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/javascript|js/.test(lowerMessage)) return 'javascript';
    if (/python/.test(lowerMessage)) return 'python';
    if (/java(?!script)/.test(lowerMessage)) return 'java';
    if (/html/.test(lowerMessage)) return 'html';
    if (/css/.test(lowerMessage)) return 'css';
    if (/react/.test(lowerMessage)) return 'react';
    
    return 'javascript'; // default
  }

  detectCodeType(message) {
    const lowerMessage = message.toLowerCase();
    
    if (/function/.test(lowerMessage)) return 'function';
    if (/class/.test(lowerMessage)) return 'class';
    if (/component/.test(lowerMessage)) return 'component';
    if (/algorithm/.test(lowerMessage)) return 'algorithm';
    
    return 'snippet';
  }

  generateCode(language, type, originalMessage) {
    const codeExamples = {
      javascript: {
        function: `// JavaScript Function Example
function processData(input) {
  // Process the input data
  const result = input.map(item => item * 2);
  return result;
}

// Usage
const data = [1, 2, 3, 4, 5];
const processed = processData(data);
console.log(processed); // [2, 4, 6, 8, 10]`,
        
        class: `// JavaScript Class Example
class DataProcessor {
  constructor(name) {
    this.name = name;
    this.data = [];
  }
  
  addData(item) {
    this.data.push(item);
  }
  
  process() {
    return this.data.map(item => item * 2);
  }
}

// Usage
const processor = new DataProcessor('MyProcessor');
processor.addData(5);
console.log(processor.process());`
      },
      
      react: {
        component: `// React Component Example
import React, { useState } from 'react';

const MyComponent = () => {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };
  
  return (
    <div className="component">
      <h2>Count: {count}</h2>
      <button onClick={handleClick}>
        Increment
      </button>
    </div>
  );
};

export default MyComponent;`
      },
      
      python: {
        function: `# Python Function Example
def process_data(input_list):
    """Process input data and return modified version"""
    result = [item * 2 for item in input_list]
    return result

# Usage
data = [1, 2, 3, 4, 5]
processed = process_data(data)
print(processed)  # [2, 4, 6, 8, 10]`
      }
    };
    
    const code = codeExamples[language]?.[type] || codeExamples.javascript.function;
    
    return `Here's a ${language} ${type} based on your request:\n\n\`\`\`${language}\n${code}\n\`\`\`\n\n*This is a template example. In a real implementation, I would generate code specifically tailored to your exact requirements.*`;
  }
}

export default AIAgent;