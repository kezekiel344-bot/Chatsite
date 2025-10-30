export default function ChatBubble({ msg, currentUid }: any) {
  const mine = msg.senderId === currentUid;
  return (
    <div
      className={`flex ${mine ? "justify-end" : "justify-start"} my-1`}
    >
      <div
        className={`p-2 rounded-2xl max-w-[70%] ${
          mine ? "bg-blue-600 text-white" : "bg-gray-200"
        }`}
      >
        {!mine && <p className="text-xs font-bold">{msg.senderName}</p>}
        <p>{msg.text}</p>
      </div>
    </div>
  );
}