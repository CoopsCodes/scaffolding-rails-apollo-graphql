module AuthenticateUser
  extend ActiveSupport::Concern

  included do
    before_action :authenticate_request
  end

  def authenticate_request
    header = request.headers['Authorization']
    header = header.split(' ').last if header
    decoded = JsonWebToken.decode(header)
    @current_user = User.find_by(id: decoded[:user_id]) if decoded
    render json: { errors: 'Not Authenticated' }, status: :unauthorized unless @current_user
  end
end
