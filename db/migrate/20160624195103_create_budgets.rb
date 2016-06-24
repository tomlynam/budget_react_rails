class CreateBudgets < ActiveRecord::Migration
  def change
    create_table :budgets do |t|
      t.string :name, null: false
      t.float :dollar_amount, null: false

      t.timestamps null: false
    end
  end
end
