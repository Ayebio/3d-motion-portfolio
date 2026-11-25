import { Download, Printer } from "lucide-react"

interface ResumeDownloadButtonProps {
  pdfHref?: string | null
  className?: string
}

export function ResumeDownloadButton({ pdfHref, className = "" }: ResumeDownloadButtonProps) {
  if (pdfHref) {
    return (
      <a
        href={pdfHref}
        download="Yang-Zongye-Resume.pdf"
        className={`inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98] ${className}`}
      >
        <Download className="size-4" aria-hidden="true" />
        下载简历 (PDF)
      </a>
    )
  }

  return (
    <button
      type="button"
      onClick={() => window.print()}
      className={`inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-5 text-sm font-medium text-primary-foreground outline-none hover:opacity-90 focus-visible:ring-2 focus-visible:ring-ring/50 active:scale-[0.98] ${className}`}
    >
      <Printer className="size-4" aria-hidden="true" />
      导出 / 打印简历 (PDF)
    </button>
  )
}
