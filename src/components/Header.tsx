import React, {FC} from 'react';
import {Link, useParams} from "react-router-dom";
import { AiOutlineHome} from "react-icons/ai";
import Button from "@mui/material/Button";

const Header: FC = () => {

    const { modelName } = useParams();

    return (
        <header>
            <Link to="/">
                <AiOutlineHome color={'black'} size={24}/>
            </Link>
            {modelName && <Button variant="contained" size={'small'}>+</Button>
            }
        </header>
    );
};

export default Header;