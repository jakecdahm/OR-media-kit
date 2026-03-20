"use client";

import { useState } from "react";
import { MediaKitContent } from "./media-kit";
import { PasswordGate } from "./password-gate";

export default function MediaKit() {
  const [unlocked, setUnlocked] = useState(false);

  return (
    <>
      {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      <MediaKitContent />
    </>
  );
}
