import Busboy from "busboy";
import { createPost } from "../../../lib/firebase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp"];

/** Parse multipart/form-data from a Next.js Request using busboy */
function parseForm(request) {
  return new Promise((resolve, reject) => {
    const fields = {};
    const files = {};
    const filePromises = []; // track each file stream completing

    const contentType = request.headers.get("content-type") || "";

    const bb = Busboy({ headers: { "content-type": contentType } });

    bb.on("field", (name, value) => {
      fields[name] = value;
    });

    bb.on("file", (name, stream, info) => {
      const { filename, mimeType } = info;
      const cleanName = name.trim(); // guard against tab/space in key
      const chunks = [];

      const p = new Promise((res) => {
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("end", () => {
          const buffer = Buffer.concat(chunks);
          files[cleanName] = { buffer, filename, mimeType, size: buffer.length };
          res();
        });
      });
      filePromises.push(p);
    });

    bb.on("finish", () => {
      // Wait for all file streams to finish before resolving
      Promise.all(filePromises).then(() => resolve({ fields, files })).catch(reject);
    });

    bb.on("error", reject);

    request.arrayBuffer().then((ab) => {
      bb.write(Buffer.from(ab));
      bb.end();
    }).catch(reject);
  });
}

export async function POST(request) {
  let fields, files;
  try {
    ({ fields, files } = await parseForm(request));
  } catch {
    return Response.json({ error: "Failed to parse form data." }, { status: 500 });
  }

  const title       = fields.title?.trim();
  const date        = fields.date?.trim();
  const description = fields.description?.trim();
  const imageFile   = files.image;

  // Validate required fields
  if (!title || !date || !description) {
    return Response.json(
      { error: "Title, date, and description are required." },
      { status: 400 }
    );
  }

  // Validate date format
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return Response.json(
      { error: "Date must be in YYYY-MM-DD format." },
      { status: 400 }
    );
  }

  // Handle optional image
  let imageUrl = "";
  if (imageFile && imageFile.size > 0) {
    const ext = (imageFile.filename || "").split(".").pop().toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return Response.json(
        { error: "Image must be JPG, PNG, or WebP." },
        { status: 400 }
      );
    }
    if (imageFile.size > MAX_IMAGE_SIZE) {
      return Response.json(
        { error: "Image must be under 5MB." },
        { status: 400 }
      );
    }

    try {
      const base64 = imageFile.buffer.toString("base64");
      const body = new URLSearchParams({ image: base64 });

      const imgRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: body.toString(),
        }
      );
      if (!imgRes.ok) throw new Error(await imgRes.text());
      const imgData = await imgRes.json();
      imageUrl = imgData.data.url;
    } catch (err) {
      console.error("Image upload error:", err);
      return Response.json(
        { error: "Image upload failed. Please try again." },
        { status: 500 }
      );
    }
  }

  try {
    const id = await createPost({ title, date, description, imageUrl });
    return Response.json(
      { id, title, date, description, image: imageUrl },
      { status: 201 }
    );
  } catch (err) {
    console.error("Firestore error:", err);
    return Response.json({ error: "Failed to save post." }, { status: 500 });
  }
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}

export function PUT() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}

export function DELETE() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
