import React, { Component } from 'react';
import { MdAddCircle as AddIcon, MdCancel as DeleteIcon } from 'react-icons/md'
import styles from './Invoice.module.scss'


class Invoice extends Component {

  locale = 'en-US'
  currency = 'USD'

  state = {
    lineItems: [
      {
        name: '',
      description: '',
      quantity: 0,
      price: 0.00
    }
    ]
  }

  render() {
    return (
      <div>
        {this.state.lineItems.map((item, i) => (
          <div className={`${styles.row} ${styles.editable}`}
          key={i}>
            <div></div>
          </div>
        ))}
      </div>
    );
  }
}

export default Invoice;
