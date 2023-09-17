import { useState} from 'react'
import { Label } from "../ui/label";
import { MagicWandIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import { Slider } from "../ui/slider";
import { Separator } from "../ui/separator";
import { PromptSelect } from "./PromptSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";


export function SelectForm() {
  const [temperature, setTemperature] = useState(0.5)


  function handlePromptSelected(template: string){
    console.log(template)
  }

  return (
    <form className="space-y-6">
    <div className="space-y-2">
      <Label>Prompt</Label>
      <PromptSelect onPromptSelected={handlePromptSelected} />
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
      <Slider min={0} max={1} step={0.1}  value={[temperature]}
        onValueChange={value => setTemperature(value[0])} />
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
  )
}

