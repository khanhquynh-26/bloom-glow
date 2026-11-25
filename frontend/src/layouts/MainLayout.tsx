
import type { ReactNode } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import AIChatWidget from '../components/chat/AIChatWidget';

interface MainLayoutProps {
  children: ReactNode;
}

function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="bg-app">
      <Header />

      <main className="bg-main-content">
        {children}
      </main>

      <Footer />

      {/* Chatbot AI hiển thị trên các trang sử dụng MainLayout */}
      <AIChatWidget />
    </div>
  );
}

export default MainLayout;
