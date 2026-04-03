export default function TypingIndicator() {
  return (
    <div className="flex justify-start">
      <div className="bg-[#1F2937] px-4 py-3 rounded-2xl rounded-bl-md border border-gray-600/30">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-[#9CA3AF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <span className="text-sm text-[#9CA3AF]">Analyzing...</span>
        </div>
      </div>
    </div>
  );
}