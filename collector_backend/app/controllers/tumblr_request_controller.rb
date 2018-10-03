class TumblrRequestController < ApplicationController

  def index
    client = Tumblr::Client.new :consumer_key => 'wqc6FQvXj6AhhegP3uR0ABnBBseCTF6NnnUe4nhcz24XuGfwE7'

    blog_post = params.require(:blog_name)
    posts_list = client.posts("#{blog_post}.tumblr.com")
    p '**************************************', client.posts('thedailyzen.tumblr.com')
    render json: posts_list
  end
end