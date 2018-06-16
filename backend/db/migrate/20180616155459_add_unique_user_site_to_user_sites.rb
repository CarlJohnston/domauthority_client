class AddUniqueUserSiteToUserSites < ActiveRecord::Migration[5.2]
  def change
    add_index :user_sites, [:user_id, :site_id], unique: true
  end
end
