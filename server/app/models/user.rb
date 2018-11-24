class User < ApplicationRecord
  devise :database_authenticatable, :registerable,
          :recoverable, :rememberable, :trackable, :validatable,
          :confirmable, :omniauthable

  include DeviseTokenAuth::Concerns::User

  before_create :skip_confirmation!

  has_many :user_sites
  has_many :sites, through: :user_sites

  def sites
    user_sites.map do |user_site|
      site = user_site.site
      site.title = user_site.title

      site
    end
  end
end
