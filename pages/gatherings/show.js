import { Component, createRef } from "react";
import { Container, Grid, Header, Segment, Ref, Sticky, Table, Item } from "semantic-ui-react";
import Layout from "../../components/Layout";

class GatheringsShowPage extends Component {
    state = {
        gathering: {
            name: 'AWS Conference 2022',
            downpayment: '0.0000000025',
            status: 'INITIALIZED'
        }
    }

    static getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    componentDidMount() {
        console.log("props:", this.props);
    }

    contextRef = createRef();
    render() {
        return (
            <Layout>
                <Container>
                    <Grid>
                        <Ref innerRef={this.contextRef}>
                            <Grid.Column width={4}>
                                <Sticky context={this.contextRef}>
                                    <Segment.Group>
                                        <Segment>
                                            <Header size="huge" textAlign="center">
                                                {this.state.gathering.name}
                                            </Header>
                                        </Segment>
                                        <Segment>ASDF</Segment>
                                        <Segment>
                                            <Table size="small" basic="very" compact fixed>
                                                <Table.Body basic="very">
                                                    <Table.Row>
                                                        <Table.Cell>Downpayment</Table.Cell>
                                                        <Table.Cell textAlign="right">{this.state.gathering.downpayment}</Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>Status</Table.Cell>
                                                        <Table.Cell textAlign="right">{this.state.gathering.status}</Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row borderless>
                                                        <Table.Cell>Downpayment</Table.Cell>
                                                        <Table.Cell textAlign="right">{this.state.gathering.downpayment}</Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                            </Table>
                                        </Segment>
                                    </Segment.Group>
                                </Sticky>
                            </Grid.Column>
                        </Ref>
                        <Grid.Column width={12}>
                            <Header>Registrars</Header>
                            <Table>
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell>Name</Table.HeaderCell>
                                        <Table.HeaderCell>Signup Date</Table.HeaderCell>
                                        <Table.HeaderCell>Attended?</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                <Table.Body>
                                    {
                                        Array(100).fill().map((_, i) => {
                                            return (
                                                <Table.Row key={i}>
                                                    <Table.Cell>Jeshui Laskarov</Table.Cell>
                                                    <Table.Cell>Today</Table.Cell>
                                                    <Table.Cell>Yes</Table.Cell>
                                                </Table.Row>
                                            );
                                        })
                                    }
                                </Table.Body>
                            </Table>
                        </Grid.Column>
                    </Grid>
                </Container>
            </Layout>
        );
    }
}

export default GatheringsShowPage;