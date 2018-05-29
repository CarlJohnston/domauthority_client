class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable

  include DeviseTokenAuth::Concerns::User

  before_create :skip_confirmation!
end
