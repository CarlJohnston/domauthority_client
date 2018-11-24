class AddUserIdToUserSites < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_sites, :user, foreign_key: true
  end
end
