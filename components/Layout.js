import React, { Component } from "react";
import { Container } from "semantic-ui-react";
import LayoutHeader from "./LayoutHeader";
import 'semantic-ui-css/semantic.min.css';

class Layout extends Component {

    render() {
        return (
            <Container fluid>
                <LayoutHeader />
                {this.props.children}
            </Container>
        );
    }
}

export default Layout;