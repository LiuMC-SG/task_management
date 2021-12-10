class Api::V1::TasksController < ApplicationController
  	def index
		task = Task.all.order(completed: :asc)
    	render json: task
  	end

  	def create
		task = Task.create!(task_params)
    	if task
      		render json: task
    	else
      		render json: task.errors
    	end
  	end

  	def show
		if task
			render json: task
		else
			render json: task.errors
		end
  	end

	def update
		task&.update!(task_params)
    	if task
			render json: task
	  	else
			render json: task.errors
	  	end
	end

  	def destroy
		task&.destroy
    	render json: { message: 'Task deleted!' }
  	end

	private

  	def task_params
    	params.permit(:name, :task, :due_date, :category, :completed)
  	end

  	def task
    	@task ||= Task.find(params[:id])
  	end
end
