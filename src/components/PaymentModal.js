import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import {
    Box,
    Button,
    Layer
} from 'grommet'

export class PaymentModal extends Component {
    render() {
        const { setShow } = this.props;
        return (
            <Layer
                onEsc={() => setShow(false)}
                onClickOutside={() => setShow(false)}>
                <Box pad="small">
                    <Box pad="small">
                        <Button primary label="Pay Now" onClick={this.payNow}/>
                    </Box>
                    <Box pad="small">
                        <Button primary label="Cash on delivery" onClick={this.cod}/>
                    </Box>
                </Box>
            </Layer>
        )
    }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = (dispatch) => {

}

export default connect(mapStateToProps, mapDispatchToProps) (withRouter(PaymentModal))
