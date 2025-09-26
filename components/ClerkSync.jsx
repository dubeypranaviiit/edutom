"use client";
import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import { useStore } from "@/store/useStore";

export default function ClerkSync() {
  const { user } = useUser();
  const setClerkId = useStore((s) => s.setClerkId);
  const clearClerkId = useStore((s) => s.clearClerkId);

  useEffect(() => {
    if (user) {
      setClerkId(user.id); 
    } else {
      clearClerkId();
    }
  }, [user, setClerkId, clearClerkId]);

  return null; 
}
