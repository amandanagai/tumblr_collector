# tumblr_collector

**NOTE: Refactoring, improvements in progress. If I had more time, I would:
- add error handling  
- add tests   
- fix css styling and display of tumblr post information on the "blog tiles"
- refactor app.js to be more concise (e.g. move functions into helper files, etc)
- fix 1 remaining react error

Description: This is a simple Rails/React webapp for searching tumblr by blogname and/or tag. You can save favorites (for demo only; does not persist). Uses tumblr API.  
    
    
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
