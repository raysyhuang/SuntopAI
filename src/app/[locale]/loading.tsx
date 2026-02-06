export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-slate-900">
      <div className="flex flex-col items-center gap-6">
        {/* Animated logo/spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center animate-pulse">
            <span className="text-white font-bold text-2xl">S</span>
          </div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-teal-200 dark:border-teal-800 border-t-teal-500 rounded-xl animate-spin" />
        </div>
        
        {/* Loading text */}
        <div className="flex flex-col items-center gap-2">
          <p className="text-gray-600 dark:text-gray-400 font-medium">
            加载中...
          </p>
          <div className="flex gap-1">
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
            <span className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
