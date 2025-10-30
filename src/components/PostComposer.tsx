"use client";
import React, { useState, useRef } from "react";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import { Image, Video, SendHorizonal, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export default function PostComposer() {
  const [caption, setCaption] = useState("");
  const [media, setMedia] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const storage = getStorage(app);
  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setMedia(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!media && !caption.trim()) return alert("Please add text, image, or video before posting.");
    if (!auth.currentUser) return alert("Please log in to post.");

    try {
      setUploading(true);

      let mediaUrl = "";
      let mediaType = "";

      if (media) {
        const fileExt = media.name.split(".").pop()?.toLowerCase();
        mediaType = fileExt?.match(/(mp4|webm|ogg)$/) ? "video" : "image";

        const storageRef = ref(storage, `media/${auth.currentUser.uid}/${Date.now()}-${media.name}`);
        const uploadTask = uploadBytesResumable(storageRef, media);

        await new Promise<void>((resolve, reject) => {
          uploadTask.on(
            "state_changed",
            undefined,
            reject,
            async () => {
              mediaUrl = await getDownloadURL(uploadTask.snapshot.ref);
              resolve();
            }
          );
        });
      }

      await addDoc(collection(db, "posts"), {
        authorId: auth.currentUser.uid,
        caption,
        mediaUrl: mediaUrl || null,
        mediaType: mediaType || null,
        createdAt: serverTimestamp(),
        likes: [],
        commentsCount: 0,
      });

      setCaption("");
      setMedia(null);
      setPreviewUrl(null);
      setUploading(false);
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to post. Try again later.");
      setUploading(false);
    }
  };

  return (
    <motion.div
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-md p-4 mb-4 border border-gray-100 dark:border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <textarea
        className="w-full bg-transparent resize-none outline-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-500 p-2 rounded-lg"
        rows={3}
        placeholder="What's on your mind?"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />

      {previewUrl && (
        <div className="mt-3 relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700">
          {media?.type.startsWith("video") ? (
            <video controls src={previewUrl} className="w-full rounded-lg" />
          ) : (
            <img src={previewUrl} alt="Preview" className="w-full rounded-lg" />
          )}
          <button
            className="absolute top-2 right-2 bg-black bg-opacity-40 text-white rounded-full px-2 py-1 text-xs"
            onClick={() => {
              setMedia(null);
              setPreviewUrl(null);
            }}
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex items-center justify-between mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
        <div className="flex gap-2">
          <button
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-500 transition"
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} /> <span className="hidden sm:inline">Photo/Video</span>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            hidden
            onChange={handleFileSelect}
          />
        </div>

        <Button
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
          onClick={handleUpload}
          disabled={uploading}
        >
          {uploading ? (
            <>
              <Loader2 className="animate-spin" size={18} /> Uploading...
            </>
          ) : (
            <>
              <SendHorizonal size={18} /> Post
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
    }
