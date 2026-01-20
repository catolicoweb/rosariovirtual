import type { ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function AppShell({ children }: Props) {
  return (
    <div className="min-h-screen px-5 pt-8 pb-44">
      <div className="mx-auto flex w-full max-w-xl flex-col gap-6">
        {children}
      </div>
    </div>
  )
}
