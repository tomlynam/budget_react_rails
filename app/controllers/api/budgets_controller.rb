class Api::BudgetsController < ApplicationController

	def index
		render json: Budget.first
	end

	def new
		@budget = Budget.new
	end

	def create
		@budget = Budget.create(budget_params)
		if @budget.save
			render json: @budget
		else
			render json: {errors: @budget.errors.full_messages}
		end
	end

	def update
		@budget = Budget.find_by(id: params[:id])
		if @budget.update(budget_params)
			render json: @budget.reload
		else
			render json: {errors: @budget.errors.full_messages}
		end
	end


	private

		def budget_params
			params.require(:budget).permit(:name, :dollar_amount)
		end

end

