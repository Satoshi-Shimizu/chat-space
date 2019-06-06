require 'rails_helper'
describe Message do
  describe '#create' do
    #メッセージを保存できる場合
    it "can save if there is a message" do
      #メッセージがあれば保存できること
      message = build(:message, image: "")
      message.valid?
      expect(message).to be_valid
    end

    it "can save if there is a image" do
      #画像があれば保存できること
      message = build(:message, message: "")
      message.valid?
      #expect(message).to be_valid
      #irb(main):001:0> m = FactoryBot.build(:message)
      #=> #<Message id: nil, message: "色々 あれる 超〜 じょうき。", image: nil, user_id: nil, group_id: nil, created_at: nil, updated_at: nil>
      #imageに値がセットされない
      expect(message.errors[:message]).to include('を入力してください')
    end

    it "can save if there is message and image" do
      #メッセージと画像があれば保存できること
      message = build(:message)
      message.valid?
      expect(message).to be_valid
    end

    #メッセージを保存できない場合
    it "can not save without a message or an image" do
      #メッセージも画像も無いと保存できないこと
      message = build(:message, message: nil, image: nil)
      message.valid?
      expect(message.errors[:message]).to include('を入力してください')

    end

    it "can not save without group_id" do
      #group_idが無いと保存できないこと
      message = build(:message, group_id: nil)
      message.valid?
      expect(message.errors[:group]).to include('を入力してください')

    end

    it "can not save without user_id" do
      #user_idが無いと保存できないこと
      message = build(:message, user_id: nil)
      message.valid?
      expect(message.errors[:user]).to include('を入力してください')

    end

  end

end
