import React, {Component} from "react";
import {Link} from "react-router";

export default class Table extends Component {

    constructor(props) {
        super(props);
    };

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.props.blogPosts[i].id);
    };

    render() {
        return (
            <div>
                <Link to="/posts/create" className="btn btn-lg btn-success">Create</Link>

                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.blogPosts && this.props.blogPosts.map((post, i) => {
                        return (
                            <tr key={i}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <Link to={`/posts/update/${post.id}`} className="btn btn-default btn-sm">Edit</Link>
                                    {/*this.deleteHandler.bind(this, i) = () => this.deleteHandler(i)*/}
                                    <btn onClick={this.deleteHandler.bind(this, i)} className="btn btn-danger btn-sm">
                                        Delete
                                    </btn>
                                </td>
                            </tr>);
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}