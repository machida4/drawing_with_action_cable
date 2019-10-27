class LineController < ApplicationController
  def index
    @number_of_connected_users = ActionCable.server.connections.length
  end
  
  def updateline
    ActionCable.server.broadcast 'lines',
      lines_params
    head :ok
    Line.create! lines_params
  end

  def history
    Line.all.each do |line|
      ActionCable.server.broadcast 'lines',
          line
        end
      head :ok
  end

  private
  def lines_params
    params.permit(:fromx, :fromy, :tox, :toy, :color)
  end
end
