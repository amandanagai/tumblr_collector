class TumblrRequestController < ApplicationController

  def index
    tumblr_api_key = Rails.application.credentials[Rails.env.to_sym][:tumblr_api_key]
    client = Tumblr::Client.new :consumer_key => tumblr_api_key

    unless params[:blog_name].empty?
      @blog_post = params.require(:blog_name)
    end
    
    unless params[:tag].empty?
      @tag = params.require(:tag)
    end

    if @blog_post && @tag
      res = client.posts("#{@blog_post}.tumblr.com", { :tag => @tag })
      @posts_list = res['posts']
    elsif @blog_post
      res = client.posts("#{@blog_post}.tumblr.com")
      @posts_list = res['posts']
    elsif @tag
      @posts_list = client.tagged(@tag)
    end

    render json: @posts_list
  end
end