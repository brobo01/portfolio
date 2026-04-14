// lib/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app"
import { getAnalytics, isSupported, logEvent } from "firebase/analytics"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Prevent re-initializing the app on hot reload in development
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)

// Analytics is browser-only — isSupported() guards against SSR crashes
let analyticsInstance = null

export async function getAnalyticsInstance() {
  if (typeof window === "undefined") return null
  if (analyticsInstance) return analyticsInstance

  const supported = await isSupported()
  if (supported) {
    analyticsInstance = getAnalytics(app)
  }
  return analyticsInstance
}

// Convenience wrapper so pages don't need to import logEvent directly
export async function trackEvent(eventName, params = {}) {
  const analytics = await getAnalyticsInstance()
  if (analytics) {
    logEvent(analytics, eventName, params)
    // console.log(`[Analytics] ${eventName}`, params)
  }
}

export default app
