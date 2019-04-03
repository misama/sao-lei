/**
 * Created by xzou2 on 7/19/18.
 */
import React, { Component } from 'react';
class UrlInput extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange (event) {
        this.props.getUrl(event.target.value)
    }
    render () {
        const { getUrl } = this.props;
        return <div class="url-input">
            <label for="url-input">URL:</label>
            <input type="text" id="url-input" name="url-input" required
                   placeholder="put your endpoint url here" onChange={this.handleChange}/>
        </div>
    }
}
export default UrlInput