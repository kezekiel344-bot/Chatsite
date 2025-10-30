import { useStories } from "../hooks/useStories";
import StoryCarousel from "../components/StoryCarousel";
import StoryComposer from "../components/StoryComposer";

export default function Home() {
  ...
  const { stories } = useStories();

  return (
    <AuthGuard>
      <div className="max-w-xl mx-auto py-6">
        <h1 className="text-2xl font-bold text-center mb-4">Chatsite Feed</h1>
        <StoryComposer />
        <StoryCarousel stories={stories} />
        <PostComposer />
        {posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
    </AuthGuard>
  );
}