Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'tasks/index'
      post 'tasks/create'
      get 'show/:id', to: 'tasks#show'
      put 'tasks/update/:id', to: 'tasks#update'
      delete 'destroy/:id', to: 'tasks#destroy'
    end
  end
  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
