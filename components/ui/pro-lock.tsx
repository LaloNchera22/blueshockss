import { Lock } from "lucide-react"
import { ReactNode } from "react"

interface ProLockProps {
  children: ReactNode
  isPro: boolean
  className?: string
}

export function ProLock({ children, isPro, className = "" }: ProLockProps) {
  if (isPro) {
    return <>{children}</>
  }

  return (
    <div className={`relative ${className}`}>
      <div className="blur-sm select-none pointer-events-none opacity-50">
        {children}
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-slate-200 dark:border-slate-800 shadow-xl rounded-2xl p-6 flex flex-col items-center gap-3 text-center max-w-[280px]">
          <div className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 p-3 rounded-full">
            <Lock size={24} />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100">Pro Feature</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Upgrade to access this feature.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
