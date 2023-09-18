import { ChangeEvent, useMemo, useState, FormEvent, useRef } from "react";
import { Textarea } from "../ui/textarea";
import { VideoIcon, UploadIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import { getFFmpeg } from "../../lib/ffmpeg";
import { fetchFile } from "@ffmpeg/util";
import { api } from "../../lib/axios";


interface VideoInputFormProps{
  onVideoUploaded: (id: string) => void
}
export function VideoInputForm(props: VideoInputFormProps) {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  const [status, setStatus] = useState<Status>("waiting");

  type Status =
    | "waiting"
    | "converting"
    | "uploading"
    | "generating"
    | "success";
  const menssageStatus = {
    converting: "Convertendo.",
    generating: "Transcrevendo..",
    uploading: "Carregando...",
    success: "Sucesso!",
  };

  //Select vídeo
  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.currentTarget;

    if (!files) {
      return null;
    }
    const selectedFile = files[0];
    setVideoFile(selectedFile);
    console.log(selectedFile)
    console.log('video file', videoFile)
  }

  //Preview vídeo
  const previewURL = useMemo(() => {
    if (!videoFile) {
      return null;
    }
    setStatus('waiting');
    return URL.createObjectURL(videoFile);
  }, [videoFile]);

  //Convert vídeo em audio
  async function convertVideoToAudio(video: File) {
    console.log("convert Init");
    const ffmpeg = await getFFmpeg();
    await ffmpeg.writeFile("input.mp4", await fetchFile(video));

    // ffmpeg.on('log', log =>{
    //   console.log(log)
    // })

    //Config ffmmpeg p/ conversão
    ffmpeg.on("progress", (progress) => {
      console.log("Progress Convert:" + Math.round(progress.progress * 100));
    });

    await ffmpeg.exec([
      "-i",
      "input.mp4",
      "-map",
      "0:a",
      "-b:a",
      "20k",
      "-acodec",
      "libmp3lame",
      "output.mp3",
    ]);

    const data = await ffmpeg.readFile("output.mp3");
    const audioFileBlob = new Blob([data], { type: "audio/mpeg" });
    const audioFile = new File([audioFileBlob], "audio.mp3", {
      type: "audio/mpeg",
    });
    console.log("convert finish");
    return audioFile;
  }

  //Submit form
  async function handleUploadVideo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //Text prompt(palavras-chaves)
    const prompt = promptInputRef.current?.value;
    if (!videoFile) {
      return;
    }
    setStatus("converting");

    //Salvando e chamando conversão de vídeo em MP3
    const audioFile = await convertVideoToAudio(videoFile);
    //Setando dados no back-end
    const data = new FormData();
    data.append("file", audioFile);
    setStatus("uploading");
    const response = await api.post("/videos", data);
    const videoId = response.data.video.id;
    setStatus("generating");
    await api.post(`/videos/${videoId}/transcription`, {
      prompt,
    });
    setStatus("success");

    props.onVideoUploaded(videoId)
  }

  return (
    <form onSubmit={handleUploadVideo} className="space-y-6">
      <label
        htmlFor="video"
        className="relative overflow-hidden border w-full flex rounded-md aspect-video cursor-pointer text-sm flex-col items-center gap-2 justify-center text-muted-foreground hover:bg-primary/5"
      >
        {previewURL ? (
          <video
            src={previewURL}
            controls={false}
            className="pointer-events-none absolute inset-0"
          />
        ) : (
          <>
            Selecionar vídeo
            <VideoIcon />
          </>
        )}
      </label>
      <input
        type="file"
        id="video"
        accept="video/mp4"
        className="sr-only"
        onChange={handleFileSelected}
      />
      <Separator />
      <div className="space-y-2">
        <Label htmlFor="transcription_prompt">Prompt de transcrição</Label>
        <Textarea
          ref={promptInputRef}
          id="transcription_prompt"
          className="min-h-28 leading-relaxed resize-none"
          placeholder="Você pode informar palavras chaves do vídeo.."
          disabled={status !== "waiting"}
        />
        <Button
          data-success={status === "success"}
          disabled={status !== "waiting"}
          type="submit"
          className="w-full data-[success=true]:bg-green-400"
        >
          {status === "waiting" ? (
            <>
              Carregar video
              <UploadIcon className="w-4 h-4 ml-2" />
            </>
          ) : (
            menssageStatus[status]
          )}
        </Button>
      </div>
    </form>
  );
}
