import { Request, Response } from "express";
import User from "../models/user";

// Sync a Firebase-authenticated user into MongoDB based on phone or uid
export async function syncFirebaseUser(req: Request, res: Response) {
  try {
    const decoded = req.user as any;
    if (!decoded) return res.status(400).json({ message: "No firebase user found on request" });

    const phone = decoded.phone_number || decoded.phone || null;
    const email = decoded.email || null;
    const name = decoded.name || decoded.displayName || null;
    const uid = decoded.uid || decoded.sub || null;

    if (!phone && !email && !uid) {
      return res.status(400).json({ message: "Firebase token lacks identifying fields (phone/email/uid)" });
    }

    // Prefer phone for matching, fallback to email, then uid
    const query: any = {};
    if (phone) query.phone = phone;
    else if (email) query.email = email;
    else query._id = uid;

    let user = await User.findOne(query).exec();
    if (!user) {
      user = new User({
        name: name || undefined,
        phone: phone || undefined,
        email: email || undefined,
        isVerified: true,
      });
      await user.save();
    } else {
      // update profile fields if missing
      let changed = false;
      if (!user.name && name) { user.name = name; changed = true; }
      if (!user.email && email) { user.email = email; changed = true; }
      if (!user.isVerified) { user.isVerified = true; changed = true; }
      if (changed) await user.save();
    }

    return res.json({ data: user });
  } catch (err: any) {
    return res.status(500).json({ error: { message: "Failed to sync user", details: err && err.message } });
  }
}

export async function getProfile(req: Request, res: Response) {
  try {
    const decoded = req.user as any;
    if (!decoded) return res.status(401).json({ message: "Unauthorized" });

    const phone = decoded.phone_number || decoded.phone || null;
    const email = decoded.email || null;
    const uid = decoded.uid || decoded.sub || null;

    const query: any = {};
    if (phone) query.phone = phone;
    else if (email) query.email = email;
    else if (uid) query._id = uid;
    else return res.status(400).json({ message: "No identifier on token" });

    const user = await User.findOne(query).lean().exec();
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json({ data: user });
  } catch (err: any) {
    return res.status(500).json({ error: { message: "Failed to fetch profile", details: err && err.message } });
  }
}
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
