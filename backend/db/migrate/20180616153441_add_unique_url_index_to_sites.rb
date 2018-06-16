class AddUniqueUrlIndexToSites < ActiveRecord::Migration[5.2]
  def change
    add_index :sites, :url, unique: true
  end
end
