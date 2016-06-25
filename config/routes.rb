Rails.application.routes.draw do
  
  root 'home#index'

  namespace :api do
    resources :budgets
    resources :lineitems
  end

  # KEEP THIS AT THE VERY BOTTOM
  get '*unmatched_route', to: 'home#index'

end
