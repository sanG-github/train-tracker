'use client';

interface LayoutWrapperProps {
  children: React.ReactNode;
  className?: string;
}

export default function LayoutWrapper({ children, className }: LayoutWrapperProps) {
  return (
    <body className={`${className} min-h-full bg-gradient-to-br from-blue-50 to-indigo-50`}>
      <header className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-blue-100/50 shadow-sm z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-semibold text-gray-800 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Train Tracker
            </h1>
            <div className="text-sm text-gray-500">Train Information</div>
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-6">
        {children}
      </main>
    </body>
  );
} 