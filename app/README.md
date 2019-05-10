# README

# DataBase Design
***
## **Users table**
|Column|Type|Options|
|------------|---------|---------------------------|
|id          |integer  |                           |
|name        |string   | null: false               |
|email       |string   | null: false, unique: true |
|password    |string   | null: false               |
|update_date |date     | null: false               |
### Function list
* New create user information
* Edit user information
### Association set
- has_many :groups_users
- has_many :groups, through: :groups_users
- has_many :groups
- has_many :messages

***
## **Groups table**
|Column|Type|Options|
|------------|---------|---------------------------------|
|id          |integer  |                                 |
|name        |string   | null: false                     |
|user_id     |integer  | null: false, foreign_key: true  |
|update_date |date     |                                 |
### Function list
* New create Group 
* Edit  Group information
### Association set
- has_many :groups_users
- has_many :users, through: :groups_users
- has_many :users
- has_many :messages


***
## **Groups_users table**
|Column|Type|Options|
|------------|---------|--------------------------------|
|id          |integer  |                                |
|group_id    |integer  | null: false, foreign_key: true |
|user_id     |integer  | null: false, foreign_key: true |
### Function list
* Groups table through users table
### Association set
- belongs_to :user
- belongs_to :group


***
## **Messages table**
|Column|Type|Options|
|------------|---------|--------------------------------|
|id          |integer  |                                |
|group_id    |integer  | null: false, foreign_key: true |
|user_id     |integer  | null: false, foreign_key: true |
|body        |text     | null: false                    |
|image       |string   |                                |
### Function list
* Post message
* Post image
### Association set
- belongs_to :user
- belongs_to :group
