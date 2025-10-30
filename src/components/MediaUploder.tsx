import React, { useState } from 'react';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../lib/firebase';

export default function MediaUploader({ uid, onUploaded }: { uid: string; onUploaded: (url: string, type: 'image'|'video') => void }) {
  const [progress, setProgress] = useState(0);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return; const isVideo = file.type.startsWith('video'); const path = `media/${uid}/${Date.now()}_${file.name}`; const storageRef = ref(storage, path); const task = uploadBytesResumable(storageRef, file);
    task.on('state_changed', (snap) => { setProgress(Math.round((snap.bytesTransferred / snap.totalBytes) * 100)); }, console.error, async () => { const url = await getDownloadURL(task.snapshot.ref); onUploaded(url, isVideo ? 'video' : 'image'); });
  };
  return (
    <div>
      <input type="file" accept="image/*,video/*" onChange={handle} />
      {progress > 0 && <div className="text-sm">Uploading: {progress}%</div>}
    </div>
  );
}