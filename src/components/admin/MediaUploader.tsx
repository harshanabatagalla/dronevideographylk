"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  label: string;
  /** settings.media key this uploader targets */
  name: "heroVideo" | "heroPoster";
  kind: "video" | "image";
  accept: string;
  currentPath?: string;
  hint?: string;
};

/**
 * Client uploader that streams a file to the admin upload API and refreshes the
 * page so the new media is reflected everywhere (hero video / poster).
 */
export function MediaUploader({ label, name, kind, accept, currentPath, hint }: Props) {
  const [status, setStatus] = useState<"idle" | "uploading" | "done" | "error">("idle");
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(currentPath ?? "");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setStatus("uploading");
    setMessage(`Uploading ${file.name}…`);
    const fd = new FormData();
    fd.append("file", file);
    fd.append("key", name);
    try {
      const res = await fetch("/api/admin/upload", { method: "POST", body: fd });
      const data = (await res.json()) as { path?: string; error?: string };
      if (!res.ok || !data.path) throw new Error(data.error ?? "Upload failed");
      setPreview(data.path);
      setStatus("done");
      setMessage("Uploaded and live on the homepage.");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setMessage(err instanceof Error ? err.message : "Upload failed");
    } finally {
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  return (
    <div className="rounded-xl border border-night/10 bg-sand/40 p-4">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-night">{label}</span>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={status === "uploading"}
          className="rounded-full bg-night px-4 py-2 text-xs font-semibold text-white transition hover:bg-night-700 disabled:opacity-50"
        >
          {status === "uploading" ? "Uploading…" : "Choose file"}
        </button>
      </div>

      {preview && (
        <div className="mt-3 overflow-hidden rounded-lg border border-night/10 bg-night">
          {kind === "video" ? (
            <video src={preview} muted loop playsInline autoPlay className="h-40 w-full object-cover" />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={preview} alt="Current media" className="h-40 w-full object-cover" />
          )}
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {hint && <p className="mt-2 text-xs text-night/65">{hint}</p>}
      {message && (
        <p
          className={`mt-2 text-xs ${
            status === "error" ? "text-coral" : status === "done" ? "text-teal" : "text-night/65"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
