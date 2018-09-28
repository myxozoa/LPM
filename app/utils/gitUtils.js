// @flow

import path from 'path';

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

  static pull(
    name: string,
    repo: string,
    username: string,
    workingDirectory: string
  ) {
    const folder = this.prepareFolderName(name);
    const studentRepo = this.prepareStudentRepo(repo, username);
    const repoName = studentRepo.split('/').slice(-1)[0];
    const localPath = `${workingDirectory}/${folder}/${repoName}`;
    const repoPath = path.resolve(`${localPath}/.git`);

    return nodegit.Repository.open(repoPath);
    // .then(repo =>
    //   repo
    //     .fetchAll()
    //     .then(() => {
    //       console.log('Pull Success: ', folder);
    //       return repo.mergeBranches('master', 'origin/master');
    //     })
    //     .catch(error => {
    //       console.error('Pull Failed: ', error);
    //     })
    // )
    // .catch(error => {
    //   console.error('Pull Failed: ', error);
    // });
  }

  static clone(
    name: string,
    repo: string,
    username: string,
    workingDirectory: string
  ) {
    const folder = this.prepareFolderName(name);
    const studentRepo = this.prepareStudentRepo(repo, username);
    const repoName = studentRepo.split('/').slice(-1)[0];
    const localPath = `${workingDirectory}/${folder}/${repoName}`;

    return nodegit.Clone(studentRepo, localPath);
  }
}
