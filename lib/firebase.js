import { initializeApp, getApps } from "firebase/app";
import {
  initializeFirestore,
  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  doc,
  deleteDoc,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Prevent re-initialization on Next.js hot reload
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0];

// Prefer WebSocket over long-polling to reduce NS_BINDING_ABORTED console noise.
// initializeFirestore throws if already called (e.g. hot reload), so fall back to getFirestore.
let db;
try {
  db = initializeFirestore(app, { experimentalAutoDetectLongPolling: true });
} catch {
  db = getFirestore(app);
}
export { db };

/**
 * Upload an image file to ImgBB (free, no Firebase Storage needed)
 * @param {File} file
 * @param {(progress: number) => void} onProgress
 * @returns {Promise<string>} image URL
 */
export async function uploadImage(file, onProgress) {
  const apiKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
  const form = new FormData();
  form.append("image", file);

  // Simulate progress since ImgBB doesn't stream progress
  onProgress && onProgress(30);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: form,
  });

  onProgress && onProgress(90);

  if (!res.ok) throw new Error("Image upload failed");
  const data = await res.json();
  onProgress && onProgress(100);
  return data.data.url;
}

// ─── Post Helpers ─────────────────────────────────────────────

/**
 * Create a new blog post
 * @param {{ title: string, description: string, date: string }} data
 * @returns {Promise<string>} new document ID
 */
export async function createPost({ title, description, date, imageUrl, tags }) {
  const docRef = await addDoc(collection(db, "posts"), {
    title,
    description,
    date,
    ...(imageUrl ? { imageUrl } : {}),
    ...(tags?.length ? { tags } : {}),
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

/**
 * Fetch all posts ordered by newest first
 * @returns {Promise<Array>}
 */
export async function getPosts() {
  const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch a single post by Firestore document ID
 * @param {string} id
 * @returns {Promise<Object|null>}
 */
export async function getPost(id) {
  const snap = await getDoc(doc(db, "posts", id));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Delete a post by Firestore document ID
 * @param {string} id
 */
export async function deletePost(id) {
  await deleteDoc(doc(db, "posts", id));
}
