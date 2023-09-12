import { Textarea } from "../ui/textarea";

export function View() {
  return (
    <div className="flex flex-col flex-1 gap-4">
      <div className="grid grid-rows-2 gap-4 flex-1">
        <Textarea
          placeholder="Inclua o prompt"
          className="resize-none p-4 leading-relaxed"
        />
        <Textarea
          placeholder="Resultado gerado"
          className=" resize-none p-4 leading-relaxed"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Lembre-se: você pode utilizar a variável{" "}
        <code className="text-green-600">{"{transcription}"}</code> no seu
        propmpt para adicionar o conteúdo da transcrição do vídeo
      </p>
    </div>
  );
}
