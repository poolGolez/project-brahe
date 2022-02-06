import React, { Component } from "react";
import { Container, Card, Segment, Dimmer, Loader, Placeholder } from "semantic-ui-react";
import GatheringCard from "../components/GatheringCard"
import { GatheringFactory, Gathering } from "../ethereum/factory";
import web3 from "../ethereum/web3";
import Layout from "../components/Layout";

class EventsListPage extends Component {

    state = {
        loaded: false,
        gatherings: []
    };

    async componentDidMount() {
        const loaded = true;

        const gathering_ids = await GatheringFactory.methods.getGatherings().call();
        this.setState({ loaded });

        const getDetailsPromises = gathering_ids.map((id) => {
            return Gathering(id).methods.getDetails().call();
        });

        const gatherings_data = await Promise.all(getDetailsPromises);
        const gatherings = gatherings_data.map((gathering, index) => {
            return {
                address: gathering_ids[index],
                name: gathering[0],
                downpayment: parseInt(gathering[1]),
                status: gathering[2],
                managerAddress: gathering[3],
                balance: web3.utils.fromWei(gathering[4], 'ether'),
                participantsCount: gathering[5]
            };
        });
        this.setState({ gatherings });
    }

    render() {
        if (this.state.loaded) {
            return (
                <Layout>
                    <Container>
                        <Card.Group itemsPerRow={3}>
                            {
                                this.state.gatherings.map((gathering, index) => {
                                    return (
                                        <GatheringCard
                                            key={index}
                                            address={gathering.address}
                                            header={gathering.name}
                                            participantsCount={gathering.participantsCount}
                                            balance={gathering.balance}
                                        />
                                    );
                                })
                            }
                        </Card.Group>
                    </Container>
                </Layout>
            );
        } else {
            return (
                <Layout>
                    <Container>
                        <Dimmer.Dimmable as={Segment}>
                            <Card.Group itemsPerRow={3}>
                                {
                                    Array(3).fill().map((_, index) => {
                                        return (
                                            <Card key={index}>
                                                <Card.Content>
                                                    <Placeholder>
                                                        <Placeholder.Header>
                                                            <Placeholder.Line length='long' />
                                                            <Placeholder.Line length='full' />
                                                            <Placeholder.Line length='full' />
                                                        </Placeholder.Header>
                                                        <Placeholder.Paragraph>
                                                            <Placeholder.Line length='long' />
                                                            <Placeholder.Line length='medium' />
                                                        </Placeholder.Paragraph>
                                                    </Placeholder>
                                                </Card.Content>
                                            </Card>
                                        );
                                    })
                                }
                            </Card.Group>
                            <Dimmer active inverted>
                                <Loader indeterminate>Retrieving Gatherings</Loader>
                            </Dimmer>
                        </Dimmer.Dimmable>
                    </Container>
                </Layout>
            );
        }
    }
}

export default EventsListPage;
