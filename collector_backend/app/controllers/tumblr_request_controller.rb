class TumblrRequestController < ApplicationController

  def index
    client = Tumblr::Client.new :consumer_key => 'wqc6FQvXj6AhhegP3uR0ABnBBseCTF6NnnUe4nhcz24XuGfwE7'

    byebug
    posts_list = client.posts(`#{params.blog_name}.tumblr.com`)
    # posts_list = client.posts 'thedailyzen.tumblr.com'
    p '**************************************', client.posts('thedailyzen.tumblr.com')
    render json: posts_list
  end
end