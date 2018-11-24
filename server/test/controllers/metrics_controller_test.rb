require 'test_helper'

class MetricsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @metric = metrics(:one)
  end

  test "should get index" do
    get metrics_url, as: :json
    assert_response :success
  end

  test "should create metric" do
    assert_difference('Metric.count') do
      post metrics_url, params: { metric: { domain_authority: @metric.domain_authority, moz_rank: @metric.moz_rank, page_authority: @metric.page_authority, site_id: @metric.site_id } }, as: :json
    end

    assert_response 201
  end

  test "should show metric" do
    get metric_url(@metric), as: :json
    assert_response :success
  end

  test "should update metric" do
    patch metric_url(@metric), params: { metric: { domain_authority: @metric.domain_authority, moz_rank: @metric.moz_rank, page_authority: @metric.page_authority, site_id: @metric.site_id } }, as: :json
    assert_response 200
  end

  test "should destroy metric" do
    assert_difference('Metric.count', -1) do
      delete metric_url(@metric), as: :json
    end

    assert_response 204
  end
end
