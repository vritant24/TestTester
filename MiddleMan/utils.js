exports.pullUserData = data => {
  var userDataInputs = [];
  userDataInputs.push(parseInt(data.profile.id));
  userDataInputs.push(data.profile.username);
  userDataInputs.push(data.profile.displayName);
  userDataInputs.push(data.profile._json.avatar_url);
  userDataInputs.push(parseInt(data.profile.id));
  userDataInputs.push(data.accessToken);
  return userDataInputs;
}

exports.packageUserRepoData = (repo_data, gitHubId) => {
  var parsed_repos_data = JSON.parse(repo_data);
  var db_repos_data = [];

  parsed_repos_data.forEach(function(repo) {
    var db_repo_data = [];

    db_repo_data.push(repo.id);
    db_repo_data.push(gitHubId);
    db_repo_data.push(false);

    db_repos_data.push(db_repo_data);

  });
  return db_repos_data;
};
