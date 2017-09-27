CREATE TABLE User (gitHubId BIGINT NOT NULL, username VARCHAR(100) NOT NULL, PRIMARY KEY(gitHubId));

CREATE TABLE UserAccess (gitHubId BIGINT, accessToken VARCHAR(1000), PRIMARY KEY(gitHubId));

CREATE TABLE UserRepo (repoId BIGINT, gitHubId BIGINT, isMonitored BOOLEAN, PRIMARY KEY(repoId, gitHubId));

CREATE TABLE Repo (repoId BIGINT, repoName VARCHAR(150), repoURL VARCHAR(150), isPublic BOOLEAN,
                   PRIMARY KEY(repoId));

CREATE TABLE UserSession (gitHubId BIGINT, sessionToken VARCHAR(1000), PRIMARY KEY(sessionToken));

CREATE TABLE ServerEndpoints (port INT, repoId BIGINT, stage VARCHAR(6), PRIMARY KEY(port))
