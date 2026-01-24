import admin from "firebase-admin";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
    console.log("🔥 Firebase Admin initialized");
  } catch (err) {
    console.warn("Firebase Admin not initialized:", err);
  }
}

export default admin;
