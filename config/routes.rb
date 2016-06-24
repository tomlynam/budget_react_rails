Rails.application.routes.draw do
  
  root 'home#index'

  namespace :api do
    resources :budgets
  end

  # KEEP THIS AT THE VERY BOTTOM
  get '*unmatched_route', to: 'home#index'

end
