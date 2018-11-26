require 'test_helper'

class MetricTest < ActiveSupport::TestCase
  test "metrics are sorted in ascending order by created date by default" do
    assert(Metric.all.count > 1)

    Metric.first.touch

    assert_equal(Metric.all.order(created_at: :asc), Metric.all)
  end
end
