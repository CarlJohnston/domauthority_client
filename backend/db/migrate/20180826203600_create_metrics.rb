class CreateMetrics < ActiveRecord::Migration[5.2]
  def change
    create_table :metrics do |t|
      t.references :site, foreign_key: true
      t.integer :domain_authority
      t.integer :page_authority
      t.integer :moz_rank

      t.timestamps
    end
  end
end
