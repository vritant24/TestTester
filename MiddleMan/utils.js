exports.pullUserData = data => {
  var userDataInputs = [];
  userDataInputs.push(parseInt(data.profile.id));
  userDataInputs.push(data.profile.username);
  userDataInputs.push(data.profile.displayName);
  userDataInputs.push(data.profile._json.avatar_url);
  return userDataInputs;
}
