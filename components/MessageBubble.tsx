interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface MessageBubbleProps {
  message: Message;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Function to format the text with bold headings
  const formatText = (text: string) => {
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[#E5E7EB]">$1</strong>')
      .replace(/\n/g, '<br />');
  };

  return (
    <div className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] lg:max-w-[70%] px-4 py-3 rounded-2xl leading-relaxed ${
          message.isUser
            ? 'bg-[#2563EB] text-white rounded-br-md'
            : 'bg-[#1F2937] text-[#E5E7EB] rounded-bl-md border border-gray-600/30'
        }`}
      >
        <div
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: formatText(message.text) }}
        />
        <div className={`text-xs mt-2 ${message.isUser ? 'text-blue-200' : 'text-[#9CA3AF]'}`}>
          {formatTime(message.timestamp)}
        </div>
      </div>
    </div>
  );
}