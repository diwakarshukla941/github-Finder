l$(document).ready(function(){
    $('#searchUser').on('keyup', function(e){
        let userName = e.target.value;

        // make request to Github

        $.ajax({
            url:'https://api.github.com/users/'+userName,
            data:{
                client_id:'Ov23liYt6CfFBtP33Ct1',
                client_secret:'c5afdf39912f7dfedc77d11679b21763cb687ac1'
            }
        }).done(function(userInfo){
            $.ajax({
                url:'https://api.github.com/users/'+userName+'/repos',
                data:{
                    client_id:'Ov23liYt6CfFBtP33Ct1',
                    client_secret:'c5afdf39912f7dfedc77d11679b21763cb687ac1',
                    sort: 'created: asc',
                    per_page: 5
                }
            }).done(function(repos){
                $.each(repos, function(index, repo){
                    $('#repos').append(`
                      <div class="card">
                        <div class="row">
                          <div class="col-md-7">
                            <strong>${repo.name}</strong>: ${repo.description}
                          </div>
                          <div class="col-md-3">
                            <span class="badge badge-dark">Forks: ${repo.forks_count}</span>
                            <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Stars: ${repo.stargazers_count}</span>
                          </div>
                          <div class="col-md-2">
                            <a href="${repo.html_url}" target="_blank" class="btn btn-dark">Repo Page</a>
                          </div>
                        </div>
                      </div>
                    `);
                  });

            })
           $('#profile').html(` 
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title">${userInfo.name}</h3>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-md-3"> 
                                <img class="thumbnail .avatar"  src="${userInfo.avatar_url}">
                                <a target="_blank" class="btn btn-dark btn-block" href="${userInfo.html_url}"> View Profile</a>
                            </div>
                            <div class="col-md-9">
                                <span class="badge text-bg-primary">Public Repos: ${userInfo.public_repos}</span>
                                <span class="badge text-bg-secondary">Public Gists: ${userInfo.public_gists}</span>
                                <span class="badge text-bg-success">Followers: ${userInfo.followers}</span>
                                <span class="badge text-bg-danger">Following: ${userInfo.following}</span>
                                <br/><br/>
                                <ul class="list-group">
                                    <li class="list-group-item>Company:${userInfo.company}</li>
                                    <li class="list-group-item>website/Blog:${userInfo.blog}</li>
                                    <li class="list-group-item>location:${userInfo.location}</li>
                                    <li class="list-group-item>Member since:${userInfo.created_at}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <h3 class="page-header">Latest Repos</h3>
                
            `);
        });

    })
});

