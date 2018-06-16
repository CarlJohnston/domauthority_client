require 'test_helper'

class UserTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
    @user.confirm

    @user_no_sites = users(:three)
  end

  test "user with no sites should have no sites" do
    assert_empty(@user_no_sites.sites)
  end

  test "user sites should contain titles based on relationship between user and site" do
    assert(@user.sites.count > 0)
    expected_user_sites = UserSite.where(user_id: @user.id)
    expected_sites = expected_user_sites.map do |expected_user_site|
      site = expected_user_site.site
      site.title = expected_user_site.title

      site
    end

    sites = @user.sites

    assert_equal(expected_sites, sites)
  end
end
