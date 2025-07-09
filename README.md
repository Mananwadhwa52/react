# AI Agent Assistant

A comprehensive AI agent with multiple capabilities built using React and modern web technologies. This intelligent assistant can help you with various tasks including calculations, file operations, web searches, text processing, time/weather information, and code generation.

## 🚀 Features

### Core Capabilities
- **Calculator**: Perform mathematical calculations and solve equations
- **File Operations**: Handle file and folder operations (simulated)
- **Web Search**: Search for information and answer questions (with mock data)
- **Text Processing**: Analyze text, count words, summarize content, and format text
- **Time & Weather**: Get current time, date, and weather information
- **Code Generation**: Generate code snippets in various programming languages

### User Interface
- Modern, responsive chat interface
- Real-time message exchange
- Typing indicators
- Markdown-like message formatting
- Collapsible capabilities sidebar
- Quick action buttons
- Message timestamps
- Smooth scrolling and animations

## 🛠️ Technology Stack

- **Frontend**: React 19.1.0 with JSX
- **Styling**: Tailwind CSS for modern, responsive design
- **Icons**: Lucide React for beautiful icons
- **Build Tool**: Parcel for fast development and building
- **Language**: JavaScript ES6+

## 📦 Installation

1. **Clone or download this project**

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   # or
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🎯 Usage

### Basic Interaction
Simply type your questions or commands in the chat input. The AI agent will analyze your message and route it to the appropriate capability.

### Example Commands

#### Calculator
- "Calculate 25 * 4 + 10"
- "What is 15 * 7?"
- "Solve (100 + 50) / 3"

#### File Operations
- "Create a new file called data.txt"
- "Read the contents of my document"
- "Delete the old backup folder"

#### Web Search
- "Search for React hooks"
- "What is artificial intelligence?"
- "Find information about JavaScript"

#### Text Processing
- "Count words in this message"
- "Analyze the sentiment of my text"
- "Convert this text to uppercase"

#### Time & Weather
- "What's the current time?"
- "Show me today's date"
- "What's the weather like?"

#### Code Generation
- "Generate a JavaScript function"
- "Write a React component"
- "Create a Python script"

## 🏗️ Project Structure

```
ai-agent/
├── components/
│   └── Chat.jsx          # Main chat interface component
├── aiAgent.js             # Core AI agent logic and capabilities
├── app.js                 # Main React application
├── index.html             # HTML entry point
├── styles.css             # Tailwind CSS styles
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── .parcelrc             # Parcel configuration
└── README.md             # Project documentation
```

## 🧠 AI Agent Architecture

The AI agent is built with a modular architecture:

### Core Agent (`AIAgent` class)
- Message processing and intent analysis
- Capability routing
- Conversation context management
- Error handling

### Capabilities (Individual classes)
1. **CalculatorCapability** - Mathematical operations
2. **FileOperationsCapability** - File system operations
3. **WebSearchCapability** - Information retrieval
4. **TextProcessorCapability** - Text analysis and formatting
5. **TimeWeatherCapability** - Time and weather data
6. **CodeGeneratorCapability** - Code snippet generation

### Intent Analysis
The agent uses pattern matching to analyze user messages and determine the most appropriate capability to handle each request.

## 🎨 Customization

### Adding New Capabilities
1. Create a new capability class following the existing pattern
2. Add it to the `capabilities` object in the `AIAgent` constructor
3. Add intent analysis patterns in the `analyzeIntent` method
4. Update the UI capabilities list in the Chat component

### Styling
The project uses Tailwind CSS for styling. You can customize:
- Colors in `tailwind.config.js`
- Component styles in `styles.css`
- Chat bubble styles using the CSS classes

### Configuration
- Modify `package.json` for dependencies
- Update `tailwind.config.js` for design system changes
- Configure build settings in `.parcelrc`

## 📝 Development Notes

### Current Implementation
- All capabilities are currently simulated/mocked for demonstration
- No external API calls are made
- Data is not persisted between sessions
- File operations are simulated (no actual file system access)

### Future Enhancements
- Integration with real APIs (OpenAI, weather services, etc.)
- Persistent conversation history
- User authentication and profiles
- Real file system operations (with proper security)
- Plugin system for extending capabilities
- Voice input/output support
- Multi-language support

## 🔧 Scripts

- `npm start` - Start development server
- `npm run dev` - Start development server on port 3000
- `npm run build` - Build for production

## 📄 License

This project is licensed under the ISC License.

## 🤝 Contributing

Feel free to contribute by:
- Adding new capabilities
- Improving the UI/UX
- Fixing bugs
- Adding tests
- Improving documentation

## 🆘 Support

If you encounter any issues or have questions:
1. Check the browser console for error messages
2. Ensure all dependencies are installed correctly
3. Try clearing your browser cache
4. Check that you're using a modern browser with ES6+ support

---

Built with ❤️ using React and modern web technologies.