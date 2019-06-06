FactoryBot.define do

  factory :message do
    message {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/uploads/message/test_image.jpg")}
    user
    group
  end
end
