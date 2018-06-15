class Users::Current::SitesController < ApplicationController
  # GET /sites
  def index
    @sites = Site.all

    render json: @sites
  end

  # POST /sites
  def create
    @site = Site.new(site_params)

    if @site.save
      render json: @site, status: :created, location: @site
    else
      render json: @site.errors, status: :unprocessable_entity
    end
  end

  private
    def site_params
      params.require(:site).permit(:name, :url)
    end
end
