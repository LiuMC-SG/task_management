class TasksChangeColumnType < ActiveRecord::Migration[6.1]
  def change
    change_column(:tasks, :due_date, :timestamp, :null => false)
  end
end
