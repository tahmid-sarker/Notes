import { Outlet } from "react-router";
import Header from "./Header";
import Footer from "./Footer";

const MainLayout = () => {
    return (
        <main>
            <Header />
            <Outlet />
            <Footer />
        </main>
    );
};

export default MainLayout;