type Props = {
  total: number
  filled: number
}

export default function ProgressDots({ total, filled }: Props) {
  return (
    <div className="flex items-center justify-center gap-2">
      {Array.from({ length: total }).map((_, idx) => {
        const isFilled = idx < filled
        return (
          <span
            key={idx}
            className={
              'h-2 w-2 rounded-full border border-[var(--rv-ink)] ' +
              (isFilled ? 'bg-[var(--rv-ink)]' : 'bg-transparent')
            }
          />
        )
      })}
    </div>
  )
}
