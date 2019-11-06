import React, {Component} from 'react';
import {deleteBlogPost, fetchBlogPosts} from '../../actions/blogPostActions';
import Table from '../../components/Table';
import {Pagination} from 'react-bootstrap';

export default class List extends Component {

    constructor(props) {
        super(props);

        this.state = {
            blogPosts: [],
            currentPageNumber: 1,
            totalItems: 1,
            itemsPerPage: 10,
            limit: 10,
            filterBy: '',
            sortBy: '',
            direction: 'asc',
        };
    };

    getBlogPosts(page, limit, filter = '', sort = '', direction = '') {

        page = page || this.state.currentPageNumber;
        limit = limit || this.state.limit;

        fetchBlogPosts(page, limit, filter, sort, direction)
            .then(apiResponse => {
                this.setState({
                    blogPosts: apiResponse.data,
                    currentPageNumber: apiResponse.currentPage,
                    totalItems: apiResponse.totalItems,
                    itemsPerPage: apiResponse.itemsPerPage,
                });
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    componentDidMount() {
        this.getBlogPosts(1);
    };

    onDelete(id) {
        deleteBlogPost(id)
            .then((data) => {
                let blogPosts = this.state.blogPosts.filter((post) => {
                    return id !== post.id;
                });

                this.setState(state => {
                    state.blogPosts = blogPosts;
                    return state;
                });
            })
            .catch((err) => {
                console.error('err', err);
            });
    }

    render() {

        let totalPages = Math.ceil(this.state.totalItems / this.state.itemsPerPage);

        return (
            <div>
                <Table blogPosts={this.state.blogPosts}
                       onDelete={this.onDelete.bind(this)}
                       onSort={this.onSort.bind(this)}
                       onFilter={this.onFilter.bind(this)}
                       onLimit={this.onLimit.bind(this)}
                />

                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    bsSize="medium"
                    items={totalPages}
                    activePage={this.state.currentPageNumber}
                    onSelect={this.handleSelect.bind(this)} />
            </div>
        );
    }

    handleSelect(number) {
        this.setState({currentPageNumber: number});

        this.getBlogPosts(number,
            this.state.limit,
            this.state.filterBy,
            this.state.sortBy,
            this.state.direction);
    }

    onSort(sortBy, direction) {
        this.setState({
            sortBy,
            direction,
        });

        this.getBlogPosts(
            this.state.currentPageNumber,
            this.state.limit,
            this.state.filterBy,
            sortBy,
            direction,
        );
    }

    onFilter(filterBy) {
        this.setState({filterBy: filterBy});
        this.getBlogPosts(this.state.currentPageNumber, this.state.limit, filterBy);
    }

    onLimit(limit) {
        this.setState({limit: limit});
        this.getBlogPosts(this.state.currentPageNumber, limit);
    }
}
