// @flow

import nodegit from 'nodegit';
import path from 'path';

export default class gitUtils {
  static prepareFolderName(name: string) {
    return name.replace(/\s|\./, '_').replace(/\.+$/, '');
  }

  static prepareStudentRepo(repo: string, username: string) {
    const temp = repo.split('/');
    temp.splice(temp.length - 2, 1, username);
    return temp.join('/');
  }

  static pull(localPath: string, folder: string) {
    const repoPath = path.resolve(`${localPath}/.git`);

    nodegit.Repository.open(repoPath)
      .then(repo =>
        repo
          .fetchAll()
          .then(() => {
            console.log('Pull Success: ', folder);
            return repo.mergeBranches('master', 'origin/master');
          })
          .catch(error => {
            console.error('Pull Failed: ', error);
          })
      )
      .catch(error => {
        console.error('Pull Failed: ', error);
      });
  }

  static clone(folder: string, repo: string, workingDirectory: string) {
    const repoName = repo.split('/').slice(-1)[0];
    const localPath = `${workingDirectory}/${folder}/${repoName}`;
    nodegit
      .Clone(repo, localPath)
      .then(() => console.log('Clone Success: ', folder))
      .catch(error => {
        console.error('Clone Failed: ', error);
        console.log('Trying Pull...');
        this.pull(localPath, folder);
      });
  }
}
