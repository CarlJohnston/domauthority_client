class Site < ApplicationRecord
  has_many :user_sites
  has_many :users, through: :user_sites

  attr_accessor :title

  def as_json options={}
    super(options).merge(
      {
        title: title,
      }
    )
  end
end
