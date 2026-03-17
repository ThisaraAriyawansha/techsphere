import { initializeApp, getApps } from "firebase/app";
import {
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

export const db = getFirestore(app);

// ─── Post Helpers ─────────────────────────────────────────────

/**
 * Create a new blog post
 * @param {{ title: string, description: string, date: string }} data
 * @returns {Promise<string>} new document ID
 */
export async function createPost({ title, description, date }) {
  const docRef = await addDoc(collection(db, "posts"), {
    title,
    description,
    date,
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
