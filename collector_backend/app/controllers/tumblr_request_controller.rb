class TumblrRequestController < ApplicationController

  def index
    client = Tumblr::Client.new :consumer_key => 'wqc6FQvXj6AhhegP3uR0ABnBBseCTF6NnnUe4nhcz24XuGfwE7'

    unless params[:blog_name].empty?
      @blog_post = params.require(:blog_name)
    end
    
    unless params[:tag].empty?
      @tag = params.require(:tag)
    end

    if @blog_post && @tag
      p '**************************************', "we made it! both tagged and blog nammed"
      @posts_list = client.posts("#{@blog_post}.tumblr.com", { :tag => @tag })
    elsif @blog_post
      @posts_list = client.posts("#{@blog_post}.tumblr.com")
    elsif @tag
      p '**************************************', "not sure yet"
      @posts_list = client.tagged(@tag)
    end

    render json: @posts_list
  end
end