require 'test_helper'

class SiteTest < ActiveSupport::TestCase
  setup do
    @site = sites(:one)
    @metrics = @site.metrics
  end

  test "site as_json should include title" do
    site_title = 'Site Title'
    @site.title = site_title
    assert_equal(site_title, @site.as_json[:title])
  end

  test "site as_json should include metrics when valid include option present" do
    site_json = @site.as_json({
                    include: [
                      "metrics",
                    ],
                  })
    assert_not_nil(site_json["metrics"])
    assert_equal(@metrics.as_json, site_json["metrics"])
  end

  test "site as_json should not include any other models when include option present but not valid" do
    site_json = @site.as_json({
                    include: [
                      "bah",
                    ],
                  })
    assert_nil(site_json["bah"])
  end

  test "site as_json should not include any other models when include option not present" do
    site_json = @site.as_json
    assert_nil(site_json["bah"])
  end
end
