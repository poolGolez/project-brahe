import React, { Component } from "react";
import { Container, Card } from "semantic-ui-react";
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
        );
    }
}

export default EventsListPage;
