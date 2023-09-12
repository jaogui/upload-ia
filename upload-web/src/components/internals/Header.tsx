
import { Separator } from '../ui/separator'
import { Button } from '../ui/button'
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export function Header() {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-b">
    <span className="text-xl font-bold">upload.ia</span>
    asdasdasda
    <div className="flex items-center gap-3">
      <span className="text-sm text-muted-foreground">
        Desenvolvido no nlw
      </span>
      <Separator orientation="vertical" className="h-5" />
      <Button variant={"outline"}>
        <GitHubLogoIcon  />
      </Button>
    </div>
  </div>
  )
}
