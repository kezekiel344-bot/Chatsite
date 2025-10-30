import { useState } from "react";
import StoryBubble from "./StoryBubble";

export default function StoryCarousel({ stories }: any) {
  const [activeStory, setActiveStory] = useState<any>(null);

  return (
    <div>
      <div className="flex gap-3 overflow-x-auto p-2">
        {stories.map((s: any) => (
          <StoryBubble key={s.id} story={s} onClick={() => setActiveStory(s)} />
        ))}
      </div>

      {activeStory && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setActiveStory(null)}
        >
          {activeStory.mediaType === "video" ? (
            <video controls className="max-h-[80%] rounded-lg">
              <source src={activeStory.mediaUrl} />
            </video>
          ) : (
            <img src={activeStory.mediaUrl} className="max-h-[80%] rounded-lg" />
          )}
        </div>
      )}
    </div>
  );
}