class MessagesController < ApplicationController
  before_action :set_group

  def index
    @messages = Message.where(group_id: @group.id)
    @message = Message.new
  end

  def create
    @message = Message.create(create_params)
    if @message.save
      respond_to do |f|
        f.html { redirect_to group_messages_path, notice:'creat New message!!' }
        f.json
      end
    else
      @messages = @group.messages.includes(:user)
      flash.now[:alert] = 'メッセージを入力してください。'
      render :index
    end
  end

  private 
  def create_params
    params.require(:message).permit(:message, :image).merge(group_id: params[:group_id]).merge(user_id: current_user.id)
  end

  def set_group
    @group = Group.find(params[:group_id])
  end
end
