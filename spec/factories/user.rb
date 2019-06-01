FactoryBot.define do

  factory :user do
    name               {"hogehoge-user"}
    sequence(:email) {Faker::Internet.email}
    encrypted_password {"00000000"}
  end
end