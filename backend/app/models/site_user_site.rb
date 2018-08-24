class SiteUserSite
  include ActiveModel::Model

  attr_accessor :url, :title, :user_id

  validates :url, :title, :user_id, presence: true

  def save
    if url.present? && user_id.present?
      ActiveRecord::Base.transaction do
        site = Site.find_or_create_by!(site_params)
        UserSite.find_or_create_by!(
          user_site_params.merge({ site_id: site.id })
        )
      end
    else
      false
    end
  end

  private

    def site_params
      {
        url: url,
      }
    end

    def user_site_params
      {
        user_id: user_id,
        title: title,
      }
    end
end
