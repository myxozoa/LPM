// @flow

import nodegit from 'nodegit';

export default class gitUtils {
  static prepareFolderName(name: string) {
    return name.replace(/\s|\./, '_').replace(/\.+$/, '');
  }

  static prepareStudentRepo(repo: string, username: string) {
    const temp = repo.split('/');
    temp.splice(temp.length - 2, 1, username);
    return temp.join('/');
  }

  static clone(folder: string, repo: string, workingDirectory: string) {
    const repoName = repo.slice(-1)[0];
    nodegit
      .Clone(repo, `${workingDirectory}/${folder}/${repoName}`)
      .then(() => console.log('Success: ', folder))
      .catch(error => console.error(error));
  }
}
