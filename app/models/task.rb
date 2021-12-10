class Task < ApplicationRecord
    validates :name, presence: true
    validates :task, presence: true
    validates :due_date, presence: true
end
