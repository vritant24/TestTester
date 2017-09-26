CREATE TABLE User (gitHubId BIGINT NOT NULL, username VARCHAR(100) NOT NULL, displayName VARCHAR(150),
                   avatarURL VARCHAR(400), PRIMARY KEY(gitHubId));

CREATE TABLE UserAccess (gitHubId BIGINT, accessToken VARCHAR(1000), PRIMARY KEY(gitHubId));

CREATE TABLE UserRepo (repoId BIGINT, gitHubId BIGINT, PRIMARY KEY(repoId, gitHubId));

CREATE TABLE Repo (repoId BIGINT, repoName VARCHAR(150), repoURL VARCHAR(150), isPublic BOOLEAN,
                   PRIMARY KEY(repoId));

CREATE TABLE UserSession (gitHubId BIGINT, sessionToken VARCHAR(1000), PRIMARY KEY(sessionToken));
