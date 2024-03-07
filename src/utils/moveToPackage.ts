import * as vscode from "vscode";
import * as path from "path";

export function moveToPackage(packageName?: string) {
  if (!packageName) {
    return;
  }

  const workspaceFolders = vscode.workspace.workspaceFolders;

  if (workspaceFolders === undefined) {
    vscode.window.showErrorMessage("No workspace is currently open.");
    return;
  }

  const workspacePath = workspaceFolders[0].uri.fsPath;
  const packagePath = path.join(
    workspacePath,
    "packages",
    packageName,
    "package.json"
  );
  const packageUri = vscode.Uri.file(packagePath);
  vscode.window.showTextDocument(packageUri).then(() => {
    vscode.window.showInformationMessage(`Opened ${packageName}`);
  });
}
