9.times do |i|
    Task.create!(
      name: "Task #{i + 1}",
      task: 'Do this task',
      due_date: "2021-12-01 00:00:00",
    )
end