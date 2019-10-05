class LineController < ApplicationController
  def index
    @number_of_connected_users = ActionCable.server.connections.length
  end
  
  def show
    ActionCable.server.broadcast 'lines',
      fromx: params[:fromx],
      fromy: params[:fromy],
      tox: params[:tox],
      toy: params[:toy],
      color: params[:color]
    head :ok
  end
end
