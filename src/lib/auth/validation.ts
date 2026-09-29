export function validatePostInput(input: unknown):
  | { ok: true; title: string; content: string }
  | { ok: false; message: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Request body must be an object." };
  }

  const { title, content } = input as { title?: unknown; content?: unknown };

  if (typeof title !== "string" || title.trim().length < 3 || title.trim().length > 120) {
    return { ok: false, message: "Title must be 3 to 120 characters." };
  }

  if (
    typeof content !== "string" ||
    content.trim().length < 1 ||
    content.trim().length > 5000
  ) {
    return { ok: false, message: "Content must be 1 to 5000 characters." };
  }

  return { ok: true, title: title.trim(), content: content.trim() };
}

export function validateNoticeCommentInput(input: unknown):
  | { ok: true; content: string }
  | { ok: false; message: string } {
  if (!input || typeof input !== "object") {
    return { ok: false, message: "Request body must be an object." };
  }

  const { content } = input as { content?: unknown };
  if (
    typeof content !== "string" ||
    content.trim().length < 1 ||
    content.trim().length > 2000
  ) {
    return { ok: false, message: "Content must be 1 to 2000 characters." };
  }

  return { ok: true, content: content.trim() };
}
