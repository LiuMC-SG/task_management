class CreateTasks < ActiveRecord::Migration[6.1]
  def change
    create_table :tasks do |t|
      t.string :name, null: false
      t.text :task, null: false
      t.date :due_date, null: false
      t.string :category, default: '', null: true
      t.boolean :completed, default: '0', null: true

      t.timestamps
    end
  end
end
