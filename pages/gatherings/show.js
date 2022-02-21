import moment from "moment";
import { Component, createRef } from "react";
import { Container, Grid, Header, Segment, Ref, Sticky, Table, Item } from "semantic-ui-react";
import Layout from "../../components/Layout";
import { Gathering } from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class GatheringsShowPage extends Component {
    state = {
        gathering: {
            name: 'AWS Conference 2022',
            downpayment: '0.0000000025',
            status: 'INITIALIZED'
        },
        participants: []
    }

    static getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    async componentDidMount() {
        console.log("props:", this.props);
        const gathering = Gathering(this.props.address);

        const gatheringDetails = await gathering.methods.getDetails().call();
        const name = gatheringDetails[0];
        const downpayment = web3.utils.fromWei(gatheringDetails[1], 'ether');
        const status = gatheringDetails[2];

        const participants = await gathering.methods.getParticipants().call();

        this.setState({
            gathering: { name, downpayment, status },
            participants
        })
    }

    contextRef = createRef();
    render() {
        return (
            <Layout>
                <Container>
                    <Grid>
                        <Ref innerRef={this.contextRef}>
                            <Grid.Column width={5}>
                                <Sticky context={this.contextRef}>
                                    <Segment.Group>
                                        <Segment>
                                            <Header size="huge" textAlign="center">
                                                {this.state.gathering.name}
                                            </Header>
                                        </Segment>
                                        <Segment>
                                            <Table size="small" basic="very" compact fixed>
                                                <Table.Body basic="very">
                                                    <Table.Row>
                                                        <Table.Cell>Status</Table.Cell>
                                                        <Table.Cell textAlign="right">{this.state.gathering.status}</Table.Cell>
                                                    </Table.Row>
                                                    <Table.Row>
                                                        <Table.Cell>Downpayment (ether)</Table.Cell>
                                                        <Table.Cell textAlign="right">{this.state.gathering.downpayment}</Table.Cell>
                                                    </Table.Row>
                                                </Table.Body>
                                            </Table>
                                        </Segment>
                                    </Segment.Group>
                                </Sticky>
                            </Grid.Column>
                        </Ref>
                        <Grid.Column width={11}>
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
                                        this.state.participants.map((participant, i) => {
                                            const signupDate = moment(parseInt(participant.signupDate));
                                            return (
                                                <Table.Row key={i}>
                                                    <Table.Cell>{participant.name}</Table.Cell>
                                                    <Table.Cell>{signupDate.format('MMMM D, yyyy')}</Table.Cell>
                                                    <Table.Cell>{participant.attended ? "Yes" : "No"}</Table.Cell>
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