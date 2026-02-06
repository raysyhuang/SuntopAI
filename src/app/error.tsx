'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log error to console in development, or to analytics service in production
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-slate-900">
      <div className="text-center px-6 max-w-lg">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-600 dark:text-red-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          出错了
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          抱歉，发生了一些意外错误。我们的技术团队已收到通知。请稍后再试，或联系我们的支持团队。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors"
          >
            重试
          </button>
          <a
            href="/zh-CN"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
          >
            返回首页
          </a>
        </div>
        {process.env.NODE_ENV === 'development' && (
          <details className="mt-8 text-left">
            <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
              错误详情 (开发模式)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 dark:bg-slate-800 rounded-lg text-xs overflow-auto">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </details>
        )}
      </div>
    </div>
  )
}
