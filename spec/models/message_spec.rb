require 'rails_helper'
describe message do
  describe '#create' do
    #メッセージを保存できる場合
    it "can save if there is a message" do
      #メッセージがあれば保存できること
    
    end

    it "can save if there is a image" do
      #画像があれば保存できること
    end

    it "can save if there is message and image" do
      #メッセージと画像があれば保存できること
    end

    #メッセージを保存できない場合
    it "can not save without a message or an image" do
      #メッセージも画像も無いと保存できないこと
    end

    it "can not save without group_id" do
      #group_idが無いと保存できないこと
    end

    it "can not save without user_id" do
      #user_idが無いと保存できないこと
    end

  end

end
