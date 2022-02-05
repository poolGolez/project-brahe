import Link from "next/link";
import { Component } from "react";
import { Card, Container, Icon, Statistic } from "semantic-ui-react";

class GatheringCard extends Component {
    render() {
        return (
            <Link href={`/gatherings/${this.props.address}`}>
                <Card>
                    <Card.Content>
                        <Card.Header>{this.props.header}</Card.Header>
                        <Card.Meta>
                            <Icon name='dollar' />{this.props.balance} eth
                        </Card.Meta>
                        <Container textAlign='right'>
                            <Statistic>
                                <Statistic.Value>{this.props.participantsCount}</Statistic.Value>
                                <Statistic.Label>Registrants</Statistic.Label>
                            </Statistic>
                        </Container>
                    </Card.Content>
                </Card>
            </Link>
        );
    }
}

export default GatheringCard;