class CreateLines < ActiveRecord::Migration[5.2]
  def change
    create_table :lines do |t|
      t.integer :fromx
      t.integer :fromy
      t.integer :tox
      t.integer :toy
      t.string :color

      t.timestamps
    end
  end
end
