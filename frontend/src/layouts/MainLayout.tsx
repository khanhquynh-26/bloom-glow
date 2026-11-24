import type { ReactNode } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';

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
    </div>
  );
}

export default MainLayout;