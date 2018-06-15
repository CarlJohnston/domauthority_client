require 'test_helper'

class SitesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @site = sites(:one)
  end

  test "should show site" do
    get site_url(@site), as: :json
    assert_response :success

    assert_equal(@site.to_json, response.body)
  end

  test "should update site" do
    new_name = 'new_name'
    new_url = 'new_url'
    patch site_url(@site), params: { site: { name: new_name, url: new_url } }, as: :json
    assert_response 200

    response_body = JSON.parse(response.body)
    assert_equal(@site.as_json.merge({ name: new_name, url: new_url, created_at: response_body['created_at'], updated_at: response_body['updated_at'] }).to_json, response.body);
  end

  test "should destroy site" do
    assert_difference('Site.count', -1) do
      delete site_url(@site), as: :json
    end

    assert_response 204
  end
end
