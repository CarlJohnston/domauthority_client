class RemoveNameFromSites < ActiveRecord::Migration[5.2]
  def change
    remove_column :sites, :name
  end
end
