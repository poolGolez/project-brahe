import Link from "next/link";
import { Component } from "react";
import { Button, Card, Container, Icon, Statistic } from "semantic-ui-react";

class GatheringCard extends Component {
    render() {
        console.log("props:", this.props);
        return (
            <Link href={`/gatherings/${this.props.id}`}>
                <Card>
                    <Card.Content>
                        <Card.Header>{this.props.header}</Card.Header>
                        <Card.Meta>
                            <Icon name='dollar' />{ this.props.balance } eth
                        </Card.Meta>
                        <Container textAlign='right'>
                            <Statistic>
                                <Statistic.Value>{this.props.participantsCount}</Statistic.Value>
                                <Statistic.Label>Registrars</Statistic.Label>
                            </Statistic>
                        </Container>
                    </Card.Content>
                </Card>
            </Link>
        );
    }
}

export default GatheringCard;