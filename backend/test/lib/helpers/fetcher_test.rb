require 'helpers/fetcher'

class FetcherTest < ActiveSupport::TestCase
  ACCESS_ID_KEY = 'DOMAUTHORITY_MOZ_ACCESS_ID'
  SECRET_KEY_KEY = 'DOMAUTHORITY_MOZ_SECRET_KEY'

  setup do
    assert_not_nil(ENV[ACCESS_ID_KEY])
    assert_not_nil(ENV[SECRET_KEY_KEY])
  end

  test "fetcher fails on authentication error when environment variables are not set and defaults and not correct" do
    previous_access_id = Fetcher::ACCESS_ID
    previous_secret_key = Fetcher::SECRET_KEY

    Kernel::silence_warnings {
      Fetcher.const_set("ACCESS_ID", nil)
      Fetcher.const_set("SECRET_KEY", nil)
    }

    sites = [
      'http://wwww.site.com',
    ]
    assert_raises Fetcher::Exceptions::Unauthorized do
      Fetcher.url_metrics(sites)
    end

    Kernel::silence_warnings {
      Fetcher.const_set("ACCESS_ID", previous_access_id)
      Fetcher.const_set("SECRET_KEY", previous_secret_key)
    }
  end

  test "fetcher with environment variables set but incorrect credentials throws authorization error on 4xx response" do
    stub_request(:post, //)
      .to_return(status: 401)

    sites = [
      'http://wwww.site.com',
    ]
    assert_raises Fetcher::Exceptions::Unauthorized do
      Fetcher.url_metrics(sites)
    end
  end

  test "fetcher with environment variables set throws server error on 5xx response" do
    stub_request(:post, //)
      .to_return(status: 500)

    sites = [
      'http://wwww.site.com',
    ]
    assert_raises Fetcher::Exceptions::ServerError do
      Fetcher.url_metrics(sites)
    end
  end

  test "fetcher with empty array of sites throws no sites to fetch error when environment variables set" do
    sites = []
    assert_raises Fetcher::Exceptions::RequestError do
      Fetcher.url_metrics(sites)
    end
  end

  test "fetcher with array of size === 1 sites as strings fetches url metrics for sites when environment variables set on 2xx response" do
    expected_data = [
      {
        upl: 'site1.com',
        pda: '1',
        upa: '1',
        pmrp: '1',
        utrp: '1',
      },
    ]

    stub_request(:post, //)
      .to_return(status: 200, body: expected_data.to_json)

    sites = [
      'http://www.site1.com',
    ]
    response_data = Fetcher.url_metrics(sites)

    assert_equal(expected_data, response_data)
  end

  test "fetcher with array of 1 <= size <= 10 sites as strings fetches url metrics for sites when environment variables set on 2xx response" do
    num_sites = 4

    expected_data = []
    sites = []
    num_sites.times do |i|
      root_domain = "site#{i}.com"
      expected_data.push(
        {
          upl: root_domain,
          ptrp: '1',
          upa: '1',
          pda: '1',
        }
      )

      sites.push("http://www.#{root_domain}")
    end

    stub_request(:post, //)
      .to_return(status: 200, body: expected_data.to_json)

    response_data = Fetcher.url_metrics(sites)

    assert_equal(expected_data, response_data)
  end

  test "fetcher with array of size === 10 sites with non-strings fetches url metrics for valid sites when environment variables set on 2xx response" do
    num_sites = 10

    expected_data = []
    sites = []
    num_sites.times do |i|
      root_domain = "site#{i}.com"
      expected_data.push(
        {
          upl: root_domain,
          ptrp: '1',
          upa: '1',
          pda: '1',
        }
      )

      sites.push("http://www.#{root_domain}")
    end

    stub_request(:post, //)
      .to_return(status: 200, body: expected_data.to_json)

    response_data = Fetcher.url_metrics(sites)

    assert_equal(expected_data, response_data)
  end

  test "fetcher with array of 1 <= size <= 10 sites with non-strings fetches url metrics for valid sites when environment variables set on 2xx response" do
    num_sites = 3

    expected_data = []
    sites = []
    num_sites.times do |i|
      root_domain = "site#{i}.com"
      expected_data.push(
        {
          upl: root_domain,
          ptrp: '1',
          upa: '1',
          pda: '1',
        }
      )

      sites.push("http://www.#{root_domain}")
    end

    sites.push({})
    sites.push([])
    sites.push(1)

    stub_request(:post, //)
      .to_return(status: 200, body: expected_data.to_json)

    response_data = Fetcher.url_metrics(sites)

    assert_equal(expected_data, response_data)
  end

  test "fetcher with array of 1 <= size <= 10 sites including nil site fetches url metrics for valid sites when environment variables set on 2xx response" do
    num_sites = 3

    expected_data = []
    sites = []
    num_sites.times do |i|
      root_domain = "site#{i}.com"
      expected_data.push(
        {
          upl: root_domain,
          ptrp: '1',
          upa: '1',
          pda: '1',
        }
      )

      sites.push("http://www.#{root_domain}")
    end

    sites.push(nil)

    stub_request(:post, //)
      .to_return(status: 200, body: expected_data.to_json)

    response_data = Fetcher.url_metrics(sites)

    assert_equal(expected_data, response_data)
  end

  test "fetcher with array of > 10 sites throws too many sites error when environment variables set" do
    num_sites = 11

    sites = []
    num_sites.times do |i|
      root_domain = "site#{i}.com"

      sites.push("http://www.#{root_domain}")
    end

    assert_raises Fetcher::Exceptions::RequestError do
      Fetcher.url_metrics(sites)
    end
  end
end
