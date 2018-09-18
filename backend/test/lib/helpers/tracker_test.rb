require "minitest/mock"
require "helpers/tracker"

class TrackerTest < ActiveSupport::TestCase
  ACCESS_ID_KEY = 'DOMAUTHORITY_MOZ_ACCESS_ID'
  SECRET_KEY_KEY = 'DOMAUTHORITY_MOZ_SECRET_KEY'

  setup do
    assert_not_nil(ENV[ACCESS_ID_KEY])
    assert_not_nil(ENV[SECRET_KEY_KEY])
  end

  test "tracker doesn't update any metrics when no sites present" do
    UserSite.destroy_all
    Metric.destroy_all
    Site.destroy_all

    Kernel.stub(:sleep, nil) do
      assert_no_difference "Site.count" do
        assert_no_difference "UserSite.count" do
          assert_no_difference "Metric.count", Site.count do
            Tracker.update
          end
        end
      end
    end
  end

  test "tracker updates all sites with new metrics on update" do
    assert(Site.count > 0)

    counter = 0
    Site.all.order(:created_at).each_slice(10) do |sites_batch|
      returned_data = []
      requested_sites_regex_string = ""
      sites_batch.each do |site|
        root_domain = site.url.split(".").last(2).join(".").chomp("/")

        returned_data.push(
          {
            upl: root_domain,
            ptrp: counter,
            upa: counter,
            pda: counter,
          }
        )

        counter += 1

        requested_sites_regex_string += ".*#{root_domain}"
      end

      stub_request(:post, //)
        .with(body: /#{requested_sites_regex_string}/)
        .to_return(body: returned_data)
    end

    Tracker.stub(:sleep, nil) do
      assert_no_difference "Site.count" do
        assert_no_difference "UserSite.count" do
          assert_difference "Metric.count", Site.count do
            Tracker.update
          end
        end
      end
    end
  end
end
