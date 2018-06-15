require 'test_helper'

class Users::Current::SitesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @site = sites(:one)
  end

  test "should get index" do
    get users_current_sites_url, as: :json
    assert_response :success
  end

  test "should create site" do
    assert_difference('Site.count') do
      post users_current_sites_url, params: { site: { name: @site.name, url: @site.url } }, as: :json
    end

    assert_response 201
  end
end
