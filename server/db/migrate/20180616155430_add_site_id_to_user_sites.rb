class AddSiteIdToUserSites < ActiveRecord::Migration[5.2]
  def change
    add_reference :user_sites, :site, foreign_key: true
  end
end
