Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  resources :sites, except: [:index, :create]

  namespace :users do
    namespace :current do
      resources :sites, only: [:index, :create]
    end
  end
end
