import React from 'react';

class LineItems extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		return(
			<div>
		    <form className="col s12">
	        <div className="input-field col m6">
	          <input id="title" type="text" required />
	          <label for="title">Expense/Credit</label>
	        </div>
	        <div className="input-field col m4">
	          <input id="price" type="text" required />
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
