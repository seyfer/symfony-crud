import React, {Component} from "react";
import Form from "../../components/Form";
import {createBlogPost} from "../../actions/blogPostActions";

export default class Create extends Component {

    handleSubmit(data) {
        createBlogPost(data);
    }

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}></Form>
            </div>
        );
    }
}