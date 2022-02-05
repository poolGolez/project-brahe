import { Component } from "react";

class GatheringsShowPage extends Component {

    static getInitialProps(props) {
        console.log("Props:", props.query);
        return {};
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