
import { VideoIcon, UploadIcon, MagicWandIcon } from "@radix-ui/react-icons";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Slider } from "../ui/slider";


export function Aside() {
  return (
    <aside className="w-80 space-y-6">
    <form className="space-y-6">
      <label
        htmlFor="video"
        className="border w-full flex rounded-md aspect-video cursor-pointer text-sm flex-col items-center gap-2 justify-center text-muted-foreground hover:bg-primary/5"
      >
        Carregue o video
        <VideoIcon />
      </label>

      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
      />
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">
          Prompt de transcrição
        </Label>
        <Textarea
          id="transcription_prompt"
          className="min-h-28 leading-relaxed resize-none"
          placeholder="Inclua as chaves mencionadas no vídeo."
        />
        <Button type="submit" className="w-full bg-zinc-800">
          Carregar vídeo
          <UploadIcon className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </form>
    <Separator />
    <form className="space-y-6">
      <div className="space-y-2">
        <Label>Prompt</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um prompt..." />
            <SelectContent>
              <SelectItem value="title">Titulo do youtube</SelectItem>
              <SelectItem value="description">
                Descrição do youtube
              </SelectItem>
            </SelectContent>
          </SelectTrigger>
        </Select>
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
              <SelectItem value="gpt3.5">GPT 3.5-turbo 16k</SelectItem>
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
        <Slider min={0} max={1} step={0.1} />
        <p className="text-sm text-muted-foreground italic leading-relaxed">
          Valores mais altos maior criatividade.
        </p>
        <Separator />
        <Button type="submit" className="w-full bg-zinc-800 flex gap-2">
          Executar
          <MagicWandIcon className="w-4 h-4" />
        </Button>
      </div>
    </form>
  </aside>
  )
}


