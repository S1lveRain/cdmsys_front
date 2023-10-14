import {FC} from "react";
import {Outlet} from "react-router-dom";
import Header from "../components/Header";
import {Home} from "./Home/Home";

const Layout: FC = () => {
    return (
        <div>
            <Header/>
            <div>
                <Home />
                <Outlet/>
            </div>
        </div>
    );
};

export default Layout;