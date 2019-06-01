class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group

  validates :message, presence: true
  mount_uploader :image, ImagesUploader
end
