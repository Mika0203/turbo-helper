import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function getPackages(): string[] {
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace is open");
    return [];
  }

  // find packages directory
  const packagesDir = workspaceFolders[0].uri.fsPath + "/packages";

  console.log({ packagesDir });

  //find directories in packages directory
  const files = fs.readdirSync(packagesDir);
  const directories = files.filter((file) =>
    fs.statSync(path.join(packagesDir, file)).isDirectory()
  );
  return directories;
}
