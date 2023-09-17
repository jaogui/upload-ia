import { useState } from "react";
import { Separator } from "../ui/separator";
import { SelectForm } from "./SelectForm";
import { VideoInputForm } from "./VideoInputForm";

export function Aside() {
  const [videoId, setVideoId] = useState<string | null>(null);
  return (
    <aside className="w-80 space-y-6">
      <VideoInputForm onVideoUploaded={setVideoId} />
      <Separator />
      <SelectForm/>
    </aside>
  );
}
