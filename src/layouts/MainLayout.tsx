import { Outlet } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScrollManager from '../components/ScrollManager';
import './MainLayout.css';

const MainLayout = () => {
  return (
    <div className="layout-container">
      <ScrollManager />
      <Header />
      <main className="main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
