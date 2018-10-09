# tumblr_collector


Make sure you have installed locally:

Rails 5.2.*
Ruby 2.5.0

cd into backend_collector and run: bundle install

get the master.key file and store it in collector_backend/config

cd into collector_ui and run: yarn install
(if you don't have yarn, install first: https://yarnpkg.com/lang/en/docs/install/)

In, backend_collector, run: rails s -p 3001
In collector_ui, run: yarn start (React app runs on port 3000)

A note on Rails 5.2 credentials:
Private credentials/api keys are stored encrypted in api-sv1040/config/credentials.yml.enc
You will need the master.key file to decrypt it
You can edit the credentials.yml.enc using EDITOR=vim rails credentials:edit via the vim editor