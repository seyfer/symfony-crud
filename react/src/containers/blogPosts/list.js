import React, {Component} from "react";
import {fetchBlogPosts} from "../../actions/blogPostActions";
import Table from "../../components/Table";

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogPosts: []
        };
    };

    componentDidMount() {
        fetchBlogPosts()
            .then((data) => {
                this.setState(state => {
                    state.blogPosts = data;
                    return state;
                })
            })
            .catch((err) => {
                console.error('err', err);
            });
    };

    render() {
        return (
            <div>
                <Table blogPosts={this.state.blogPosts}/>
            </div>
        );
    }
}