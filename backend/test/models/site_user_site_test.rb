require 'test_helper'

class SiteUserSiteTest < ActiveSupport::TestCase
  setup do
    @user = users(:one)
    @site = sites(:one)
    @user_site = user_sites(:one_one)
  end

  test "create using new site/new user_site with valid information creates both entities" do
    new_site_data = {
      url: 'http://wwww.doesnotexist.com',
    }
    assert_nil(Site.find_by(new_site_data))
    new_user_site_data = {
      title: 'random',
    }

    assert_difference 'Site.count' do
      assert_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          url: new_site_data[:url],
          title: new_user_site_data[:title],
        )
        assert(@site_user_site.save)
      end
    end
  end

  test "create using new site/new user_site with invalid information does not creates either entities" do
    new_site_data = {
      url: 'http://wwww.doesnotexist.com',
    }
    assert_nil(Site.find_by(new_site_data))
    new_user_site_data = {
      title: 'random',
    }

    assert_no_difference 'Site.count' do
      assert_no_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          title: new_user_site_data[:title],
        )
        assert_not(@site_user_site.save)
      end
    end
  end

  test "create using new site/previous user_site with valid information" do
    # TODO figure out how to test this case using AR
  end

  test "create using new site/previous user_site with invalid information" do
    # TODO figure out how to test this case using AR
  end

  test "create using previous site/new user_site with valid information" do
    site = Site.create(url: 'http://www.doesnotexist.com/')

    assert_nil(UserSite.find_by(site_id: site.id))
    new_user_site_data = {
      title: 'random',
    }

    assert_no_difference 'Site.count' do
      assert_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          url: site.url,
          title: new_user_site_data[:title],
        )
        assert(@site_user_site.save)
      end
    end
  end

  test "create using previous site/new user_site with invalid information" do
    site = Site.create(url: 'http://www.doesnotexist.com/')

    assert_nil(UserSite.find_by(site_id: site.id))
    new_user_site_data = {
      title: 'random',
    }

    assert_no_difference 'Site.count' do
      assert_no_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          title: new_user_site_data[:title],
        )
        assert_not(@site_user_site.save)
      end
    end
  end

  test "create using previous site/previous user_site with valid information" do
    assert_no_difference 'Site.count' do
      assert_no_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          url: @site.url,
          title: @user_site.title,
        )
        assert(@site_user_site.save)
      end
    end
  end

  test "create using previous site/previous user_site with invalid information" do
    assert_no_difference 'Site.count' do
      assert_no_difference 'UserSite.count' do
        @site_user_site = SiteUserSite.new(
          user_id: @user.id,
          title: @user_site.title,
        )
        assert_not(@site_user_site.save)
      end
    end
  end
end
