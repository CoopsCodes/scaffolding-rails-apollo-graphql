class FrontendController < ApplicationController
	def index
		respond_to do |format|
		format.html { render template: 'layouts/application', layout: false }
		format.any  { head :not_found }
		end
	end
end
