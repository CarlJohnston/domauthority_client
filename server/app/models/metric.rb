class Metric < ApplicationRecord
  default_scope { order(created_at: :asc) }

  belongs_to :site
end
