import { useState } from "react";
import { Header } from "./components/internals/Header";
import { Textarea } from "./components/ui/textarea";
import { Separator } from "./components/ui/separator";
import { VideoInputForm } from "./components/internals/VideoInputForm";
import { Label } from "./components/ui/label";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Button } from "./components/ui/button";
import { Slider } from "./components/ui/slider";
import { PromptSelect } from "./components/internals/PromptSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  completion,
} from "./components/ui/select";
import { useCompletion } from "ai/react";
export function App() {
  const [videoId, setVideoId] = useState<string | null>(null);
  const [temperature, setTemperature] = useState(0.5);

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: "http://localhost:3333/ai/complete",
    body: {
      videoId,
      temperature,
    },
    headers: {
      "Content-Type": "application/json",
    },
  });

  return (
    <>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 p-6 flex gap-6">
          <aside className="w-80 space-y-6">
            <VideoInputForm onVideoUploaded={setVideoId} />
            <Separator />

            <>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                  <Label>Prompt</Label>
                  <PromptSelect onPromptSelected={setInput} />
                  <span className="text-sm text-muted-foreground italic">
                    Talvez você consiga alterar essa opção em breve.
                  </span>
                </div>
                <div className="space-y-2">
                  <Label>Modelo</Label>
                  <Select defaultValue="gpt3.5" disabled>
                    <SelectTrigger>
                      <SelectValue />
                      <SelectContent>
                        <SelectItem value="gpt3.5">
                          GPT 3.5-turbo 16k
                        </SelectItem>
                      </SelectContent>
                    </SelectTrigger>
                  </Select>
                  <span className="text-sm text-muted-foreground italic">
                    Talvez você consiga alterar essa opção em breve.
                  </span>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label>Temperatura</Label>
                  <Slider
                    min={0}
                    max={1}
                    step={0.1}
                    value={[temperature]}
                    onValueChange={(value) => setTemperature(value[0])}
                  />
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    Valores mais altos maior criatividade.
                  </p>
                  <Separator />
                  <Button
                    disabled={isLoading}
                    type="submit"
                    className="w-full bg-zinc-800 flex gap-2"
                  >
                    Executar
                    <MagicWandIcon className="w-4 h-4" />
                  </Button>
                </div>
              </form>
            </>
          </aside>
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea
                placeholder="Inclua o prompt"
                className="resize-none p-4 leading-relaxed"
                value={input}
                onChange={handleInputChange}
              />
              <Textarea
                placeholder="Resultado gerado pela IA.."
                className=" resize-none p-4 leading-relaxed"
                readOnly
                value={completion}
              />
            </div>
            <p className="text-sm text-muted-foreground">
              Lembre-se: você pode utilizar a variável{" "}
              <code className="text-green-600">{"{transcription}"}</code> no seu
              propmpt para adicionar o conteúdo da transcrição do vídeo
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
