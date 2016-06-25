class Api::LineItemsController < ApplicationController

	def index
		render json: LineItems.all
	end


	private


end

