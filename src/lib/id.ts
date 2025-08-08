export function getOrCreateClientId(): string {
  if (typeof window === "undefined") return "server";
  const key = "client_id";
  let id = localStorage.getItem(key);
  if (!id) {
    id = generateId();
    localStorage.setItem(key, id);
  }
  return id;
}

function generateId(): string {
  if (typeof crypto !== "undefined" && "getRandomValues" in crypto) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, "0")).join("");
  }
  return Math.random().toString(36).slice(2) + Date.now().toString(36);
}
