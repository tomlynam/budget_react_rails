import React from 'react';
import LineItems from './LineItems';

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
		this.setState({ editView: !this.state.editView });
	}

	handleEdit(e) {
		e.preventDefault();
		let name = this.refs.name.value;
		let dollar_amount = this.refs.dollar_amount.value;
		$.ajax({
			url: '/api/budgets/1',
			type: 'PUT',
			data: { budget: { name, dollar_amount } },
			dataType: 'JSON'
		}).done( budget => {
			this.setState({ budget, editView: false });
		}).fail( data => {
			console.log(data);
		})
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
			return(
				<div className='container'>
					<h3 className='center'>Budget React App</h3>
					<h3>Edit Budget:</h3>
					<form onSubmit={this.handleEdit.bind(this)}>
						<input ref='name' type='text' placeholder='Name' defaultValue={this.state.budget.name} />
						<input ref='dollar_amount' type='text' placeholder='Income' defaultValue={this.state.budget.dollar_amount} />
						<input type='submit' value='Update Budget' className='btn' />
					</form>
				</div>
			)
		} else {
			if(this.state.budget) {
				// return card with user's name and income
				return( 
					<div className="row container">
						<h3 className='center'>{this.state.budget.name}&#39;s Budget</h3>
		        <div className="col s12">
		          <div className="card blue-grey darken-1">
		            <div className="card-content white-text">
		              <div className="card-title">Income: ${this.state.budget.dollar_amount}</div>
		              <button className='btn' onClick={this.toggleEdit}>Edit</button>
		            </div>
		          </div>
		        </div>
		        <hr />
		        <LineItems />
		      </div>
				)
			} else {
				// show a form to input name and income
				return(
					<div className='container'>
					<h3 className='center'>Budget React App</h3>
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
