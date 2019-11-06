import React from 'react';

const Form = React.createClass({

    componentWillReceiveProps(props) {
        this.setState(props);
    },

    getInitialState() {
        return {
            body: this.props.body || 'some body',
            title: this.props.title || 'some title',
        };
    },

    handleBodyChange(e) {
        this.setState({
            body: e.target.value,
        });
    },

    handleTitleChange(e) {
        this.setState({
            title: e.target.value,
        });
    },

    handleSubmit(e) {
        e.preventDefault();

        //we have handler here from Form call parameter onSubmit
        this.props.onSubmit(this.state);
    },

    render() {
        return (
            <form name="blog_post" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div id="blog_post">
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_title">Title</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_title"
                                   required="required"
                                   value={this.state.title}
                                   onChange={this.handleTitleChange}
                                   className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-2 control-label required" htmlFor="blog_post_body">Body</label>
                        <div className="col-sm-10">
                            <input type="text"
                                   id="blog_post_body"
                                   required="required"
                                   value={this.state.body}
                                   onChange={this.handleBodyChange}
                                   className="form-control" />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-2"></div>
                        <div className="col-sm-10">
                            <button type="submit"
                                    id="blog_post_submit"
                                    className="btn-default btn">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        );
    },
});

export default Form;
