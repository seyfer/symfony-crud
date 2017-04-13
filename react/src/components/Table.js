import React, {Component} from "react";

export default class Table extends Component {

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.props.blogPosts && this.props.blogPosts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <a href="" className="btn btn-default btn-sm">Edit</a>
                                    <a href="" className="btn btn-danger btn-sm">Delete</a>
                                </td>
                            </tr>);
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}