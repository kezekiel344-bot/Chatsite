export default function StoryBubble({ story, onClick }: any) {
  return (
    <div className="flex flex-col items-center cursor-pointer" onClick={onClick}>
      <div className="w-14 h-14 rounded-full border-2 border-red-500 overflow-hidden">
        <img src={story.mediaUrl} alt="story" className="w-full h-full object-cover" />
      </div>
      <p className="text-xs mt-1">{story.userName}</p>
    </div>
  );
}