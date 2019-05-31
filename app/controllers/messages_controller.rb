class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    @messages = Message.where(group_id: @group.id)
    @message = Message.new
    #binding.pry
  end

  def create
    Message.create(create_params)
    #binding.pry
    redirect_to group_messages_path, notice:'creat New message!!'
  end

  private 
  def create_params
    params.require(:message).permit(:message, :image).merge(group_id: params[:group_id]).merge(user_id: current_user.id)
  end

  
end
