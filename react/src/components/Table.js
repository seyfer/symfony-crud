import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Table extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogPosts: props.blogPosts,
            totalPages: props.totalPages,
            currentPageNumber: props.currentPageNumber,
            itemsPerPage: props.itemsPerPage,
            reverse: true,
            titleFilter: '',
            limit: props.itemsPerPage,
        };
    };

    deleteHandler(i, e) {
        e.preventDefault();
        this.props.onDelete(this.props.blogPosts[i].id);
    };

    sortingHandler(sortBy) {
        this.setState({
            sortBy: sortBy,
            reverse: !this.state.reverse,
        });

        this.props.onSort(sortBy, this.state.reverse ? 'desc' : 'asc');
    }

    titleFilterHandler(e) {
        this.setState({
            titleFilter: e.target.value,
        });
        this.props.onFilter(e.target.value || '');
    }

    limitHandler(e) {
        this.setState({
            limit: e.target.value,
        });
        this.props.onLimit(e.target.value, this.state.itemsPerPage);
    }


    render() {
        return (
            <div>
                <label htmlFor="limiter">Limit</label>
                <input type="text"
                       id="table_limiter"
                       value={this.state.limit}
                       onChange={this.limitHandler.bind(this)}
                       className="form-control" />

                <Link to="/posts/create" className="btn btn-lg btn-success">Create</Link>

                <table className="table table-hover table-responsive">
                    <thead>
                    <tr>
                        <th>
                            <span onClick={() => this.sortingHandler('bp.id')}>id</span>
                        </th>
                        <th>
                            <span onClick={() => this.sortingHandler('bp.title')}>Title</span>
                            <input type="text"
                                   id="table_blog_title_filter"
                                   value={this.state.titleFilter}
                                   onChange={this.titleFilterHandler.bind(this)}
                                   className="form-control" />
                        </th>
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
