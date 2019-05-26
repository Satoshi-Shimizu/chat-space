# DataBase Design
## **Users table**
|Column|Type|Options| 
|------------|---------|------------------------------|
|name        |string   | null: false                  |
### Association set
- has_many :messages

***
## **Groups table**
|Column|Type|Options|
|------------|---------|---------------------------------|
|name        |string   | null: false                     |
### Association set
- has_many :messages

***
## **Groups_users table**
|Column|Type|Options|
|------------|---------|--------------------|
|group_id    |integer  |  foreign_key: true |
|user_id     |integer  |  foreign_key: true |
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
### Association set
- belongs_to :user
- belongs_to :group
