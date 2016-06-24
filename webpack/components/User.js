import React from 'react';

class User extends React.Component {
	constructor(props) {
		super(props);
		this.state = { budget: null, editView: false }
		this.toggleEdit = this.toggleEdit.bind(this);
	}

	componentWillMount() {
		$.ajax({
			url: '/api/budgets/',
			type: 'GET',
			dataType: 'JSON'
		}).done( budget => {
			this.setState({ budget })
		}).fail( data => {
			console.log(data);
		})
	}

	toggleEdit() {

	}

	handleEdit(e) {
		e.preventDefault();
	}

	addBudget(e) {
		// prevent default form submit from happening
		e.preventDefault();
		// make ajax call to create a new budget
		let name = this.refs.name.value;
		let dollar_amount = this.refs.dollar_amount.value;
		$.ajax({
			url: '/api/budgets',
			type: 'POST',
			data: { budget: {name: this.refs.name.value, dollar_amount: this.refs.dollar_amount.value} },
			dataType: 'JSON'
		}).done( budget => {
			this.setState({ budget, editView: false });
		}).fail( response => {
			alert('did not work');
		});
	}


	render() {
		if(this.state.editView) {
			// render edit view
		} else {
			if(this.state.budget) {
				// return card with user's name and income
				return( 
					<div className="row container">
		        <div className="col s12">
		          <div className="card blue-grey darken-1">
		            <div className="card-content white-text">
		              <div className="card-title">Income: ${this.state.budget.dollar_amount}</div>
		              <button className='btn' onClick={this.toggleEdit}>Edit</button>
		            </div>
		          </div>
		        </div>
		        <hr />
		      </div>
				)
			} else {
				// show a form to input name and income
				return(
					<div className='container'>
						<form onSubmit={this.addBudget.bind(this)}>
							<input type='text' placeholder='Name' ref='name' required />
							<input type='text' placeholder='Income (e.g. 10000)' ref='dollar_amount' required />
							<input type='submit' className='btn' />
						</form>
					</div>
				)
			}
		}
	}
}

export default User;
