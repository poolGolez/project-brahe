import { Component } from "react";

class GatheringsShowPage extends Component {

    static getInitialProps(props) {
        return {
            address: props.query.address
        };
    }

    componentDidMount() {
        console.log("props:", this.props);
    }

    render() {
        return (
            <div>Hello World!</div>
        );
    }
}

export default GatheringsShowPage;