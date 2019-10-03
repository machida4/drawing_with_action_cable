Rails.application.routes.draw do
  mount ActionCable.server => '/cable'

  get "/", t: "line#index"
  post "/updateline", to: "line#show"
end
