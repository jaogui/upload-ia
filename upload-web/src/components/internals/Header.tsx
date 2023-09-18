
import { Separator } from '../ui/separator'
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { Hammer } from 'lucide-react';

export function Header() {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
    <span className="text-xl font-bold">
      <Hammer />
    </span>
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Gerador de títulos e descrições para vídeos.
      </span>
      <Separator orientation="vertical" className="h-5" />
      <a href='https://github.com/jaogui/upload-ia' target='_blank' className='border p-2 shadow-sm rounded-full'>
        <GitHubLogoIcon  />
      </a>
    </div>
  </div>
  )
}
