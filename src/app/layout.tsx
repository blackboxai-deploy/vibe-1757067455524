import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Sports Match Predictor',
  description: 'AI-powered sports match predictions with comprehensive analysis',
  keywords: ['sports', 'prediction', 'football', 'soccer', 'AI', 'analysis'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
          {/* Navigation */}
          <nav className="bg-white shadow-sm border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-between h-16">
                <div className="flex items-center">
                  <h1 className="text-xl font-bold text-gray-900">
                    Sports Predictor
                  </h1>
                </div>
                <div className="hidden md:block">
                  <p className="text-sm text-gray-600">
                    AI-powered match predictions
                  </p>
                </div>
              </div>
            </div>
          </nav>

          {/* Main Content */}
          <main className="py-8 px-4 sm:px-6 lg:px-8">
            {children}
          </main>

          {/* Footer */}
          <footer className="bg-gray-50 border-t border-gray-200 mt-12">
            <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
              <div className="text-center text-sm text-gray-600">
                <p>
                  Sports Match Predictor - Advanced AI analysis for better predictions
                </p>
                <p className="mt-2">
                  Get detailed insights, win probabilities, and score predictions
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}