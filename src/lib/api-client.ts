/**
 * Posts JSON to one of our own API routes and returns the reply. On any problem
 * it throws an Error whose message is written for the visitor: a network failure
 * or a non JSON answer (for example an error page from the server in front of the
 * app) never shows raw browser text such as "Unexpected token <".
 */
export async function postJson<T extends { ok?: boolean; error?: string }>(
  url: string,
  body: unknown,
): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch {
    throw new Error("We could not reach the server. Check your internet and try again, or message us on WhatsApp.");
  }
  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    // The answer was not JSON. The message below covers it.
  }
  if (!res.ok || !data?.ok) {
    throw new Error(data?.error ?? "Something went wrong on our side. Please try again, or message us on WhatsApp.");
  }
  return data;
}
