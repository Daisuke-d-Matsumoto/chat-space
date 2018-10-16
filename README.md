# README

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|password|string|null: false, unique: true|
|email|string|null: false, unique: true|
|name|string|null: false, unique: true, index: true|

### Association
- has_many :messages
- has_many :members
- has/many :groups, through: :members

## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: true|


### Association
- has_many :messages
- has_many :members
- has_many :users, through: :members

## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|
|body|varchar||
|image|string||

### Association
- belongs_to :groups
- belongs_to :users

## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|references|null: false, foreign_key: true|
|group_id|references|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user
