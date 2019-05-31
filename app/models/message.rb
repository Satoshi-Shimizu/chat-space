class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :message, persence: true, unlss: :image?
end
