import { Component } from "react";
import { Menu, Image, Icon } from "semantic-ui-react";
import CreateGatheringModal from "./gathering/form";

class Header extends Component {
    render() {
        return (
            <Menu borderless>
                <Menu.Item href='/'>
                    <Image src='https://react.semantic-ui.com/logo.png' size='mini' />
                </Menu.Item>
                <Menu.Item header>
                    Project Brahe
                </Menu.Item>

                <Menu.Menu position='right'>
                    <CreateGatheringModal
                        trigger={
                            <Menu.Item link>
                                <Icon name="plus" />
                                Create Gathering
                            </Menu.Item>
                        } />
                </Menu.Menu>
            </Menu >
        );
    }
}

export default Header;