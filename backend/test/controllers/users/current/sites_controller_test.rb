require 'test_helper'
require 'AuthenticationHelper'

class Users::Current::SitesControllerTest < ActionDispatch::IntegrationTest
  include AuthenticationHelper

  setup do
    @user = users(:one)
    @user.confirm
    sign_in(@user.email, 'password')

    @site = sites(:one)
  end

  test "should get index" do
    get users_current_sites_url, as: :json
    assert_response :unauthorized

    authentication_get @user, users_current_sites_url, as: :json
    assert_response :success

    assert_equal(Site.all.to_json, response.body)
  end

  test "should create site" do
    assert_no_difference('Site.count') do
      post users_current_sites_url, params: { site: { url: 'http://www.newurl.com' } }, as: :json
    end
    assert_response :unauthorized

    assert_difference('Site.count') do
      authentication_post @user, users_current_sites_url, params: { site: { url: 'http://www.newurl.com' } }, as: :json
    end
    assert_response 201
  end

  test "should not create with non-unique url" do
    assert_no_difference('Site.count') do
      assert_raises(ActiveRecord::RecordNotUnique) do
        authentication_post @user, users_current_sites_url, params: { site: { url: @site.url } }, as: :json
      end
    end
  end
end
