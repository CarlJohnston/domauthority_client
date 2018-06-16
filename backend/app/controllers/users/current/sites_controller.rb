require 'uri'

class Users::Current::SitesController < ApplicationController
  before_action :authenticate_user!

  # GET users/current/sites
  def index
    @sites = current_user.sites

    render json: @sites
  end

  # POST users/current/sites
  def create
    if params.has_key?(:site) && params[:site].has_key?(:url)
      @previous_site = Site.find_by(url: params[:site][:url])

      if params[:site].has_key?(:title)
        title = params[:site][:title]
      else
        begin
          title = URI(params[:site][:url]).host
        rescue
          title = ''
        end
      end

      if @previous_site.present?
        @previous_user_site = UserSite.where(site_id: @previous_site.id, user_id: current_user.id)
        if @previous_user_site.present?
          render json: {}, status: :conflict
        else
          @user_site = UserSite.new(site_id: @previous_site.id, user_id: current_user.id, title: title)

          if @user_site.save
            render json: @previous_site.as_json.merge({ title: @user_site.title }), status: :created, location: @previous_site
          else
            render json: @user_site.errors, status: :unprocessable_entity
          end
        end
      else
        @site = Site.new(url: params[:site][:url])

        if @site.save
          @previous_user_site = UserSite.where(site_id: @site.id, user_id: current_user.id)
          if @previous_user_site.present?
            render json: @site.as_json.merge({ title: @previous_user_site.title }), status: :created, location: @site
          else
            @user_site = UserSite.new(site_id: @site.id, user_id: current_user.id, title: title)

            if @user_site.save
              render json: @site.as_json.merge({ title: @user_site.title }), status: :created, location: @site
            else
              @site.destroy

              render json: @user_site.errors, status: :unprocessable_entity
            end
          end
        else
          render json: @site.errors, status: :unprocessable_entity
        end
      end
    else
      render json: {}, status: :unprocessable_entity
    end
  end

  private
    def site_params
      params.require(:site).permit(:url, :title)
    end
end
