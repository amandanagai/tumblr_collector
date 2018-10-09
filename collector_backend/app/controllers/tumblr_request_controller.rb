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
      p '**************************************', "we made it! both tagged and blog named"
      @posts_list = client.posts("#{@blog_post}.tumblr.com", { :tag => @tag })
    elsif @blog_post
      p '**************************************', "blog name results"
      @posts_list = client.posts("#{@blog_post}.tumblr.com")
    elsif @tag
      p '**************************************', "tagged results"
      @posts_list = client.tagged(@tag)
    end

    render json: @posts_list
  end
end