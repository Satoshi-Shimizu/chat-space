class MessagesController < ApplicationController

  def index
    @group = Group.find(params[:group_id])
    #binding.pry
  end

  def create
  end
  
end
