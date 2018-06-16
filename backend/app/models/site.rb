class Site < ApplicationRecord
  has_many :user_sites
  has_many :users, through: :user_sites

  attr_accessor :title
end
