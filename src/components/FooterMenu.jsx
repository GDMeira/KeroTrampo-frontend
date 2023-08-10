import { Link, useLocation } from "react-router-dom";
import { pages } from "../routes/routes";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import styled from "styled-components";
import { useEffect, useState } from "react";

export default function FooterMenu() {
    const [focus, setFocus] = useState(-1);
    const location = useLocation();

    useEffect(() => {
        switch (location.pathname) {
            case pages.myServices:
                setFocus(0)
                break;
        
            case pages.home:
                setFocus(1)
                break;

            case pages.servicesByCategories:
                setFocus(2)
                break;
        
            default:
                setFocus(-1)
                break;
        }
    }, [location.pathname]);

    return (
        <MenuSC>
            <Tabs isFitted align="center" variant='solid-rounded' index={focus}>
                <TabList>
                    <Tab color={'white'}><Link to={pages.myServices}>Meus Trampos</Link></Tab>

                    <Tab color={'white'}><Link to={pages.home}>Home</Link></Tab>

                    <Tab color={'white'}><Link to={pages.servicesByCategories}>Categorias</Link></Tab>
                </TabList>
            </Tabs>
        </MenuSC>
    )
}

const MenuSC = styled.footer`
    position: fixed;
    bottom: 0;
    width: 100vw;
    background-color: #151414;
    color: #fff;
    opacity: 0.93
`