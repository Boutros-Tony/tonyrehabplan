const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
} as const;

function hasConfig(): boolean {
  return !!(
    firebaseConfig.apiKey &&
    firebaseConfig.authDomain &&
    firebaseConfig.databaseURL &&
    firebaseConfig.projectId &&
    firebaseConfig.appId
  );
}

// We type as unknown here to avoid bringing firebase types before install
export async function getFirebaseApp(): Promise<unknown | null> {
  if (!hasConfig()) return null;
  // @ts-expect-error dynamic import to avoid type resolution before package install
  const { initializeApp, getApps } = await import("firebase/app");
  if (!getApps().length) {
    initializeApp(firebaseConfig as unknown as Record<string, unknown>);
  }
  return (await getApps())[0] as unknown;
}

export async function getDb(): Promise<unknown | null> {
  const app = await getFirebaseApp();
  if (!app) return null;
  // @ts-expect-error dynamic import
  const { getDatabase } = await import("firebase/database");
  return getDatabase(app);
}
