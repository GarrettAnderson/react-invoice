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
      details: '',
      quantity: 0,
      price: 0.00
    }
    ]
  }

  handleLineItemChange = (elementIndex) => (event) => {
    let lineItems = this.state.lineItems.map((item, i) => {
      if (elementIndex !== i) return item
      return {...item, [event.target.name]: event.target.value}
    })
    this.setState({lineItems})
  }

  handleFocusSelect = (event) => {
    event.target.select()
  }

  handleAddLineItem = (event) => {

    this.setState({
      lineItems: this.state.lineItems.concat(
        [{ name: '', description: '', quantity: 0, price: 0.00}]
      )
    })
  }

  handleRemovalLineItem = (elementIndex) => (event) => {
    this.setState({
      lineItems: this.state.lineItems.filter((item, i) => {
        return elementIndex !== i
      })
    })
  }

  formatCurrency = (amount) => {
    return (new Intl.NumberFormat(this.locale, {
      style: 'currency',
      currency: this.currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(amount))
  }

  calcLineItemsTotal = (c) => {
    return this.state.lineItems.reduce((prev, cur) => (prev + (cur.quantity * cur.price)), 0)
  }

  // calcTaxTotal = () => {
  //   return this.calcLineItemsTotal() * (this.state.taxRate / 100)
  // }

  // calcGrandTotal = () => {
  //   return this.calcLineItemsTotal() + this.calcTaxTotal
  // }

  render() {
    return (
      <div>
        <h2>Invoice</h2>  
      {this.state.lineItems.map((item, i) => (
          <div className={`${styles.row} ${styles.editable}`}
          key={i}>
            <div>{i+1}</div>
            <div><input name="name" type="text" value={item.name} onChange={this.handleLineItemChange(i)}/></div>
            <div><input name="details" type="text" value={item.details} onChange={this.handleLineItemChange(i)}/></div>
            <div><input name="quantity" type="number" step="1" value={item.quantity} onChange={this.handleLineItemChange(i)} onFocus={this.handleFocusSelect}/></div>
            <div className={styles.currency}><input name="price" type="number" step="0.01" min="0.00" max="9999999.99" value={item.price} onChange={this.handleLineItemChange(i)} onFocus={this.handleFocusSelect} /></div>
            <div className={styles.currency}>{this.formatCurrency(item.quantity * item.price)}</div>
          <div>
          <button type="button" className={styles.deleteItem} onClick={this.handleRemovalLineItem(i)}><DeleteIcon size="1.25em"/></button>
          </div>
        </div>
        ))}
        </div>
    );
  }
}

export default Invoice;
