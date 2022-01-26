import React, { Component } from "react";
import { Container, Card, Menu, Image, Icon } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';
import GatheringCard from "../components/GatheringCard"

class EventsListPage extends Component {

    render() {
        const gatherings = [
            {
                id: 1,
                header: "JS Summit 2019",
                participantsCount: 748,
                balance: 0.757
            },
            {
                id: 2,
                header: "JS Summit 2020",
                participantsCount: 881,
                balance: 0.957
            },
            {
                id: 3,
                header: "JS Summit 2020",
                participantsCount: 1191,
                balance: 1.084
            },
            {
                id: 4,
                header: "JS Summit 2021",
                participantsCount: 357,
                balance: 0.027
            },
        ];
        return (
            <Container fluid>
                <Menu borderless>
                    <Menu.Item>
                        <Image src='https://react.semantic-ui.com/logo.png' size='mini' />
                    </Menu.Item>
                    <Menu.Item header>
                        Project Brahe
                    </Menu.Item>

                    <Menu.Menu position='right'>
                        <Menu.Item>
                            <Icon name="plus" />
                            Create Gathering
                        </Menu.Item>
                    </Menu.Menu>

                </Menu>


                <Container>
                    <Card.Group itemsPerRow={3}>
                        {
                            gatherings.map((g) => {
                                return <GatheringCard
                                    id={g.id}
                                    header={g.header}
                                    participantsCount={g.participantsCount}
                                    balance={g.balance}
                                />;
                            })
                        }
                    </Card.Group>
                </Container>
            </Container >
        );
    }
}

export default EventsListPage;
