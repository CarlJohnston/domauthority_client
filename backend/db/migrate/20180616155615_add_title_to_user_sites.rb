class AddTitleToUserSites < ActiveRecord::Migration[5.2]
  def change
    add_column :user_sites, :title, :string
  end
end
