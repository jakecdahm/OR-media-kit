"use client";

import { useState } from "react";
import { notFound } from "next/navigation";
import { SPONSORS } from "../sponsors";
import { MediaKitContent } from "../media-kit";
import { PasswordGate } from "../password-gate";

export default function SponsorPage({
  params,
}: {
  params: { sponsor: string };
}) {
  const [unlocked, setUnlocked] = useState(false);
  const config = SPONSORS[params.sponsor];

  if (!config) {
    notFound();
  }

  return (
    <>
      {!unlocked && <PasswordGate onUnlock={() => setUnlocked(true)} />}
      <MediaKitContent sponsorConfig={config} />
    </>
  );
}
