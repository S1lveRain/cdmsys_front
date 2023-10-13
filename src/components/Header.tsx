import React, {FC} from 'react';
import {Link} from "react-router-dom";
import { AiOutlineHome} from "react-icons/ai";

const Header: FC = () => {
    return (
        <header>
            <Link to="/">
                <AiOutlineHome/>
            </Link>
        </header>
    );
};

export default Header;