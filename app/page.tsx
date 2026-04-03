import ChatBox from '../components/ChatBox';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <ChatBox />
      </div>
    </main>
  );
}