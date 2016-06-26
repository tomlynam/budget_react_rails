import React from 'react';

class LineItems extends React.Component {
	constructor(props) {
		super(props);
		this.state = { lineitems: [] }
		this.addLineItem = this.addLineItem.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: '/api/lineitems/',
			type: 'GET',
			dataType: 'JSON'
		}).done( lineitems => {
			this.setState({ lineitems });
		}).fail( data => {
			console.log(data);
		})
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

	displayLineItems() {
		return this.state.lineitems.map( lineitem => {
			return( 
	      <div key={`lineitem-${lineitem.id}`} className="col s12">
	        <div className="card blue-grey darken-1">
	          <div className="card-content white-text">
	            <span className="card-title">{lineitem.title}: ${lineitem.price}</span>
	          </div>
	        </div>
	      </div>
			)
		})
	}

	render() {
		return(
			<div>
				<div className='row'>
					{this.displayLineItems.bind(this)()}
				</div>
		    <form ref='addForm' onSubmit={this.addLineItem}>
	        <div className="input-field col m6">
	          <input ref="title" id="title" type="text" required />
	          <label for="title">Expense/Credit</label>
	        </div>
	        <div className="input-field col m4">
	          <input ref="price" id="price" type="text" required />
	          <label for="price">Amount</label>
	        </div>
	        <div className="input-field col m2">
	        	<input type='submit' className='btn' />
	        </div>
		    </form>
      </div>
		)
	}
}

export default LineItems;
