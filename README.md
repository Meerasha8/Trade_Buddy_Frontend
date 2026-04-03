# Trade Buddy - AI Stock Analysis Chatbot

An AI-powered stock analysis chatbot built with Next.js, TypeScript, and Tailwind CSS. Get instant stock analysis and recommendations through a conversational interface.

## 🚀 Features

- **Real-time Stock Analysis**: Fetches live stock data from external API
- **AI-Powered Insights**: Converts raw data into human-friendly explanations
- **Modern Chat Interface**: Clean, responsive UI with dark mode support
- **Error Handling**: Robust error handling for invalid stocks or API failures
- **Mobile Responsive**: Works seamlessly on all devices
- **Vercel Ready**: Optimized for deployment on Vercel

## 🛠 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Fetch API (no external libraries)
- **Deployment**: Vercel

## 📦 Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd trade-buddy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🔧 Environment Variables

No environment variables are required for this project. The stock analysis API is publicly accessible.

## 📡 API Integration

The app integrates with the stock analysis API at:
```
https://stock.hub.zerve.cloud/analyze?stock=<SYMBOL>
```

**API Response Format:**
```json
{
  "stock": "AAPL",
  "prediction": "UP",
  "confidence": 62.75,
  "macro_summary": {...},
  "sentiment_summary": {...},
  "risk_level": "LOW",
  "final_recommendation": "HOLD",
  "reasoning": [...]
}
```

## 🚀 Deployment to Vercel

1. Push your code to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. Go to [Vercel](https://vercel.com) and sign in with your GitHub account.

3. Click "New Project" and import your repository.

4. Vercel will automatically detect it's a Next.js project. Click "Deploy".

5. Your app will be live at `https://your-project-name.vercel.app`.

## 🧪 Testing

- **Local Testing**: Run `npm run dev` and test with various stock symbols
- **API Testing**: Test with valid symbols (AAPL, TSLA) and invalid ones
- **Error Handling**: Check behavior when API is down or invalid input
- **Mobile Testing**: Test responsiveness on different screen sizes

## 📱 Usage

1. Open the app in your browser
2. Type a stock symbol (e.g., "AAPL") or "Analyze TSLA"
3. The AI assistant will fetch and analyze the stock data
4. Receive a formatted response with prediction, confidence, and recommendation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 📸 Screenshots

*[Add screenshots of your app here]*

---

Built with ❤️ using Next.js and Tailwind CSS