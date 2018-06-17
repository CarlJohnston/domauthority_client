require 'test_helper'

class SiteTest < ActiveSupport::TestCase
  setup do
    @site = sites(:one)
  end

  test "site as_json should include title" do
    site_title = 'Site Title'
    @site.title = site_title
    assert_equal(site_title, @site.as_json[:title])
  end
end
