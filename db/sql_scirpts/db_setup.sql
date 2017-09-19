CREATE TABLE User (gitHubId BIGINT, username VARCHAR(100), displayName VARCHAR(150),
                   avatarURL VARCHAR(400));

CREATE TABLE UserAccess (gitHubId BIGINT, accessToken VARCHAR(1000));

CREATE TABLE UserRepo (repoId BIGINT, gitHubId BIGINT);

CREATE TABLE Repo (repoId BIGINT, repoName VARCHAR(150), repoURL VARCHAR(150), isPublic BOOLEAN);
