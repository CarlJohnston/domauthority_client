class SitesController < ApplicationController
  before_action :authenticate_user!

  before_action :set_site, only: [:show, :update, :destroy]

  # GET /sites/1
  def show
    render json: @site
  end

  # PATCH/PUT /sites/1
  def update
    if @site.update(site_params)
      render json: @site
    else
      render json: @site.errors, status: :unprocessable_entity
    end
  end

  # DELETE /sites/1
  def destroy
    @site.destroy
  end

  private
    def set_site
      @site = Site.find(params[:id])
    end

    def site_params
      params.require(:site).permit(:url)
    end
end
