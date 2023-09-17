import { Separator } from "../ui/separator";
import PromptSelectForm from "./PromptSelectForm";
import { VideoInputForm } from "./VideoInputForm";

export function Aside() {
  return (
    <aside className="w-80 space-y-6">
      <VideoInputForm />
      <Separator />
      <PromptSelectForm />
    </aside>
  );
}
