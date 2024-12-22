$(document).ready(function () {
    $('#searchUser').on('keyup', function (e) {
        let userName = e.target.value;

        if (userName === '') {
            $('#profile').html('');
            $('#repos').html('');
            return;
        }

        // Fetch user information
        $.ajax({
            url: `https://api.github.com/users/${userName}`,
        }).done(function (userInfo) {
            $('#profile').html(`
                <div class="card p-4">
                    <div class="row">
                        <div class="col-md-3 text-center">
                            <img src="${userInfo.avatar_url}" alt="Avatar">
                            <a href="${userInfo.html_url}" target="_blank" class="btn btn-primary w-100 mt-3">View Profile</a>
                        </div>
                        <div class="col-md-9">
                            <h3>${userInfo.name || 'No Name Provided'}</h3>
                            <p>${userInfo.bio || 'No bio available.'}</p>
                            <span class="badge bg-primary">Public Repos: ${userInfo.public_repos}</span>
                            <span class="badge bg-secondary">Public Gists: ${userInfo.public_gists}</span>
                            <span class="badge bg-success">Followers: ${userInfo.followers}</span>
                            <span class="badge bg-danger">Following: ${userInfo.following}</span>
                            <ul class="list-group mt-3">
                                <li class="list-group-item">Company: ${userInfo.company || 'N/A'}</li>
                                <li class="list-group-item">Website/Blog: <a href="${userInfo.blog}" target="_blank">${userInfo.blog || 'N/A'}</a></li>
                                <li class="list-group-item">Location: ${userInfo.location || 'N/A'}</li>
                                <li class="list-group-item">Member Since: ${new Date(userInfo.created_at).toLocaleDateString()}</li>
                            </ul>
                        </div>
                    </div>
                </div>
            `);

            // Fetch repositories
            $.ajax({
                url: `https://api.github.com/users/${userName}/repos`,
                data: {
                    sort: 'created: asc',
                    per_page: 5,
                },
            }).done(function (repos) {
                $('#repos').html('<h3 class="text-center mb-3">Latest Repositories</h3>');
                $.each(repos, function (index, repo) {
                    $('#repos').append(`
                        <div class="card">
                            <h5>${repo.name}</h5>
                            <a href="${repo.html_url}" target="_blank" class="btn">View Repo</a>
                            <div>
                                <span class="badge bg-dark">Forks: ${repo.forks_count}</span>
                                <span class="badge bg-primary">Watchers: ${repo.watchers_count}</span>
                                <span class="badge bg-success">Stars: ${repo.stargazers_count}</span>
                            </div>
                        </div>
                    `);
                });
            }).fail(function (jqXHR) {
                if (jqXHR.status === 403) {
                    $('#profile').html('<div class="alert alert-warning">API Rate Limit Exceeded. Please try again later.</div>');
                    $('#repos').html('');
                }
            });
        }).fail(function (jqXHR) {
            if (jqXHR.status === 403) {
                $('#profile').html('<div class="alert alert-warning">API Rate Limit Exceeded. Please try again later.</div>');
                $('#repos').html('');
            } else {
                $('#profile').html('<div class="alert alert-danger">User not found</div>');
                $('#repos').html('');
            }
        });
    });
});
