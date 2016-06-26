class Api::LineitemsController < ApplicationController

	def index
		render json: Lineitem.all
	end

	def new
		@lineitem = Lineitem.new
	end

	def create
		@lineitem = Lineitem.create(lineitem_params)
		if @lineitem.save
			render json: @lineitem
		else
			render json: {errors: @lineitem.errors.full_messages}
		end
	end

	private

		def lineitem_params
			params.require(:lineitem).permit(:title, :price)
		end

end
