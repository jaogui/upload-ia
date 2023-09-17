import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { api } from "../../lib/axios";

interface Prompt {
  id: string;
  titulo: string;
  template: string;
}

export function PromptSelect() {
  const [prompts, setPrompts] = useState<Prompt | null>(null);

  useEffect(() => {
    api.get("/prompts").then((response) => {
      setPrompts(response.data);
    });
  }, []);

  return (
    <Select>
      <SelectTrigger>
        <SelectValue placeholder="Selecione um prompt..." />
        <SelectContent>
        {prompts?.map(prompt => {
          return (
            <SelectItem key={prompt.id} value={prompt.id}>{prompt.title}</SelectItem>
          )
        })}
        </SelectContent>
      </SelectTrigger>
    </Select>
  );
}
