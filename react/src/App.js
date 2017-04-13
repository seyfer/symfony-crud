import React, {Component} from "react";
import fetch from "isomorphic-fetch";

import 'bootstrap';
import Bootstrap from 'bootstrap/dist/css/bootstrap.css';

export default class App extends Component {


    constructor(props) {
        super(props);

        this.state = {
            blogPosts: []
        };
    }

    componentDidMount() {

        fetch('http://localhost:8000/app_dev.php/posts', {
            method: 'GET',
            mode: 'CORS'
        }).then(res => res.json())
            .then(data => {
                this.setState({
                    blogPosts: data
                })
            }).catch(err => err);

    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-xs-4"></div>
                        <div className="col-xs-4">
                            <h1>
                                Hello world
                            </h1>
                        </div>
                        <div className="col-xs-4"></div>
                    </div>
                </div>
                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>id</th>
                        <th>Title</th>
                        <th>Options</th>
                    </tr>
                    </thead>
                    <tbody>

                    {this.state.blogPosts && this.state.blogPosts.map(post => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>
                                <td>{post.title}</td>
                                <td>
                                    <a href="#" className="btn btn-default btn-sm">Edit</a>
                                    <a href="#" className="btn btn-danger btn-sm">Delete</a>
                                </td>
                            </tr>
                        );
                    })}
                    </tbody>
                </table>
            </div>
        );
    }
}
