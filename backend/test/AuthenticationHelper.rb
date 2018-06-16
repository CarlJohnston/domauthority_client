module AuthenticationHelper
  %i(get post put patch delete).each do |http_method|
    define_method("authentication_#{http_method}") do |user, action_name, args={}|
      authentication_headers = user.create_new_auth_token
      public_send(http_method, action_name, args.merge({ headers: authentication_headers }))
    end
  end

  def sign_in email, password
    post user_session_url, params: { email: email, password: password }, as: :json
  end
end
