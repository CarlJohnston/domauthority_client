require "logger"
require "helpers/fetcher"

class Tracker
  INTERVAL = 15

  def self.update
    last_site = Site.last

    Site.all.order(:created_at).each_slice(10) do |site_batch|
      site_urls = site_batch.map(&:url)

      begin
        new_metrics = Fetcher.url_metrics(site_urls)

        new_metrics.each_with_index do |new_metric, index|
          new_metric_sites = site_batch.select do |site|
            site.url.include?(new_metric[:upl])
          end
          if (new_metric_sites.length == 1)
            new_metric_site = new_metric_sites[0]
            Metric.create(
              site_id: new_metric_site.id,
              moz_rank: new_metric[:pmrp],
              domain_authority: new_metric[:upa],
              page_authority: new_metric[:pda],
            )
          end
        end

        if (site_batch[-1] != last_site)
          sleep INTERVAL
        end
      rescue Fetcher::Exception => e
        Rails.logger.error("Error in Tracker#update!")
        Rails.logger.error(e.message)
        Rails.logger.error("site_urls: #{site_urls}")
      end
    end
  end
end
