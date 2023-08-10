import { Link } from "react-router-dom";
import { pages } from "../routes/routes";
import { Tab, TabList, Tabs } from "@chakra-ui/react";
import styled from "styled-components";

export default function FooterMenu() {

    return (
        <MenuSC>
            <Tabs isFitted align="center" variant='solid-rounded'>
                <TabList>
                    <Tab 
                        color={'white'}
                        // _selected={{ color: 'white', bg: 'yellow.600' }}
                    ><Link to={pages.home}>Home</Link></Tab>
                    <Tab color={'white'}><Link to={pages.myServices}>Meus Trampos</Link></Tab>

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