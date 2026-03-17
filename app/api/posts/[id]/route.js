import { deletePost, getPost } from "../../../../lib/firebase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function DELETE(request, { params }) {
  const { id } = params;

  if (!id) {
    return Response.json({ error: "Post ID is required." }, { status: 400 });
  }

  try {
    const post = await getPost(id);
    if (!post) {
      return Response.json({ error: "Post not found." }, { status: 404 });
    }

    await deletePost(id);
    return Response.json({ success: true, id }, { status: 200 });
  } catch (err) {
    console.error("Delete error:", err);
    return Response.json({ error: "Failed to delete post." }, { status: 500 });
  }
}

export function GET() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}

export function POST() {
  return Response.json({ error: "Method not allowed." }, { status: 405 });
}
