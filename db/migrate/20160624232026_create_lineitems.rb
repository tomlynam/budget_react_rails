class CreateLineitems < ActiveRecord::Migration
  def change
    create_table :lineitems do |t|
      t.string :title
      t.float :price
      t.belongs_to :budget

      t.timestamps null: false
    end
  end
end
