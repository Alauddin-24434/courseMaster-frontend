interface ProgressBarProps {
  progress: number
  size?: "sm" | "md" | "lg"
}

export function ProgressBar({ progress, size = "md" }: ProgressBarProps) {
  const heightClass = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3",
  }[size]

  return (
    <div className={`w-full bg-muted rounded-full overflow-hidden ${heightClass}`}>
      <div
        className="bg-gradient-to-r from-primary to-secondary h-full rounded-full transition-all duration-300"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
