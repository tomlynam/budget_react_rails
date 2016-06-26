import React from 'react';

class LineItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lineitems: [] }
		this.addLineItem = this.addLineItem.bind(this);
		this.sumLineItems = this.sumLineItems.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: '/api/lineitems/',
			type: 'GET',
			dataType: 'JSON'
		}).done( lineitems => {
			this.setState({ lineitems });
			this.sumLineItems();
		}).fail( data => {
			console.log(data);
		})
	}

	sumLineItems() {
		console.log('in here');
	}

	addLineItem(e) {
		// prevent default form submit from happening
		e.preventDefault();
		// make ajax call to create a new budget
		let title = this.refs.title.value;
		let price = this.refs.price.value;
		$.ajax({
			url: '/api/lineitems',
			type: 'POST',
			data: { lineitem: { title, price } },
			dataType: 'JSON'
		}).done( lineitem => {
			this.setState({ lineitems: [lineitem, ...this.state.lineitems ]});
			this.refs.addForm.reset();
		}).fail( response => {
			alert('did not work');
		});
	}

	deleteLineItem(id) {
		$.ajax({
			url: `/api/lineitems/${id}`,
			type: 'DELETE',
			dataType: 'JSON'
		}).done( data => {
			let lineitems = this.state.lineitems;
			let index = lineitems.findIndex( l => l.id === id);
			this.setState({
				lineitems: [
					...lineitems.slice(0, index),
					...lineitems.slice(index + 1, lineitems.length)
				]
			});
		}).fail( data => {
			console.log(data);
		})
	}

	displayLineItems() {
		return this.state.lineitems.map( lineitem => {
			return( 
	      <div key={`lineitem-${lineitem.id}`} className="col s12">
	        <div className="row">
	          <div className="col s6">
		        	<h5>{lineitem.title}</h5>
		        </div>
		        <div className="col s4">
		          <h5>${lineitem.price}</h5>
		        </div>
		        <div className="col s2">
		        	<button onClick={() => this.deleteLineItem(lineitem.id)} className='btn red dlt'>Delete</button>
		        </div>
		      </div>
	      </div>
			)
		})
	}

	render() {
		return(
			<div>
		    <form ref='addForm' onSubmit={this.addLineItem}>
	        <div className="input-field col m6">
	          <input ref="title" id="title" type="text" required />
	          <label for="title">Add Expense/Credit</label>
	        </div>
	        <div className="input-field col m4">
	          <input ref="price" id="price" type="text" required />
	          <label for="price">Amount</label>
	        </div>
	        <div className="input-field col m2">
	        	<input type='submit' className='btn' />
	        </div>
		    </form>
		    <div className="row">
			    <div className="col s12">
	          <div className="card blue-grey darken-1">
	            <div className="card-content white-text">
	              <span className="card-title">Remaining Balance: </span>
	            </div>
	          </div>
	        </div>
	       </div>
		    <div className='row'>
					{this.displayLineItems.bind(this)()}
				</div>
      </div>
		)
	}
}

export default LineItems;
