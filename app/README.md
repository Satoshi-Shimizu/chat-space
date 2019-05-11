# README

# DataBase Design
***
## **Users table**
|Column|Type|Options|
|------------|---------|---------------------------|
### Function list
* New create user information
* Edit user information
- has_many :messages

***
## **Groups table**
|Column|Type|Options|
|------------|---------|---------------------------------|
### Function list
* New create Group 
* Edit  Group information
- has_many :messages


***
## **Groups_users table**
|Column|Type|Options|
|------------|---------|--------------------------------|
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
|group_id    |integer  | null: false, foreign_key: true |
|user_id     |integer  | null: false, foreign_key: true |
|body        |text     |                                |
|image       |string   |                                |
### Function list
* Post message
* Post image
### Association set
- belongs_to :user
- belongs_to :group
