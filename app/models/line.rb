class Line
  include Mongoid::Document
  include Mongoid::Timestamps

  field :fromx, type: Integer
  field :fromy, type: Integer
  field :tox, type: Integer
  field :toy, type: Integer
  field :color, type: String
end
