import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export async function createDirectory(): Promise<{
  success: boolean;
  path: string | null;
}> {
  return new Promise<{
    success: boolean;
    path: string | null;
  }>((resolve, reject) => {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
      vscode.window.showErrorMessage("No workspace is open");
      resolve({
        success: false,
        path: null,
      });
      return;
    }

    vscode.window
      .showInputBox({ prompt: "Enter the name of the new package" })
      .then((packageName) => {
        if (!packageName) {
          vscode.window.showErrorMessage("Package name is required");
          resolve({
            success: false,
            path: "",
          });
          return;
        }

        const isDirExists = fs.existsSync(
          path.join(workspaceFolders[0].uri.fsPath, "packages", packageName)
        );

        if (isDirExists) {
          vscode.window.showErrorMessage("Package already exists");
          resolve({
            success: false,
            path: "",
          });
        }

        const packagePath = path.join(
          workspaceFolders[0].uri.fsPath,
          "packages",
          packageName
        );

        fs.mkdirSync(packagePath);

        resolve({
          success: true,
          path: packagePath,
        });
      });
  });
}
