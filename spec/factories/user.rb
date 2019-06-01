FactoryBot.define do

  factory :user do
    name               {Faker::Name.last_name}
    sequence(:email) {Faker::Internet.free_email}
    password = Facker::Interner.password(8)
    password {password}
    password_confirmation {password}
  end
end