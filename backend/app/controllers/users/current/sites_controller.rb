require 'uri'

class Users::Current::SitesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_site, only: [:destroy]

  # GET users/current/sites
  def index
    @sites = current_user.sites

    render json: @sites
  end

  # POST users/current/sites
  def create
    if params.has_key?(:site) && params[:site].has_key?(:url)
      if params[:site].has_key?(:title)
        title = params[:site][:title]
      else
        begin
          title = URI(params[:site][:url]).host
        rescue
          title = ''
        end
      end

      @site_user_site = SiteUserSite.new(
        site_user_site_params.merge(
          {
            user_id: current_user.id,
            title: title,
          }
        )
      )

      if @site_user_site.save
        @site = Site.find_by(url: @site_user_site.url)
        @site.title = UserSite.find_by(site_id: @site.id).title

        render json: @site, status: :created
      else
        render json: @site_user_site.errors, status: :unprocessable_entity
      end
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  def destroy
    @user_site = UserSite.find_by(user_id: current_user.id, site_id: @site.id)

    if @user_site.present?
      @user_site.destroy
    else
      render json: {}, status: :not_found
    end
  end

  private
    def set_site
      @site = Site.find(params[:id])
    end

    def site_user_site_params
      params.require(:site).permit(:url, :title)
    end
end
