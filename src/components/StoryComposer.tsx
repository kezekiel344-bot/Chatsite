import { useState } from "react";
import { useStories } from "../hooks/useStories";

export default function StoryComposer() {
  const { postStory } = useStories();
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return alert("Select a file first");
    await postStory(file);
    setFile(null);
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-white rounded-xl mb-3">
      <input type="file" accept="image/*,video/*" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white px-3 py-1 rounded-lg">
        Upload Story
      </button>
    </div>
  );
}