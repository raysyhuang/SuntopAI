import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f5f5f7] dark:bg-slate-900">
      <div className="text-center px-6 max-w-lg">
        <div className="mb-8">
          <span className="text-8xl font-bold bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
          页面未找到
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
          抱歉，您访问的页面不存在或已被移除。请检查URL是否正确，或返回首页继续浏览。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/zh-CN"
            className="inline-flex items-center justify-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-medium transition-colors"
          >
            返回首页
          </Link>
          <Link
            href="/zh-CN/contact"
            className="inline-flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-900 dark:text-white rounded-xl font-medium transition-colors"
          >
            联系我们
          </Link>
        </div>
      </div>
    </div>
  )
}
