...
<p className="text-gray-700 mb-2">{post.caption}</p>
<button
  onClick={toggleLike}
  className={`text-sm font-medium ${
    likes.includes(userId) ? "text-red-500" : "text-gray-500"
  }`}
>
  ❤️ {likes.length} likes
</button>

<CommentSection postId={post.id} />
</div>
);
}