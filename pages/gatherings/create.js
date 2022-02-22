import { Component } from "react";
import { Container, Header } from "semantic-ui-react";
import Layout from "../../components/Layout";

class GatheringsCreatePage extends Component {

    async componentDidMount() {
    }

    render() {
        return (
            <Layout>
                <Container>
                    <Header>Create Gathering</Header>
                </Container>
            </Layout>
        );
    }
}

export default GatheringsCreatePage;