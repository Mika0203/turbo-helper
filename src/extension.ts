import * as vscode from "vscode";
import * as fs from "fs";
import * as path from "path";

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "turborepo-helper.createPackage",
    () => {
      const workspaceFolders = vscode.workspace.workspaceFolders;
      if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace is open");
        return;
      }

      vscode.window
        .showInputBox({
          prompt: "Enter the name of the new package",
        })
        .then((packageName) => {
          if (!packageName) {
            vscode.window.showErrorMessage("Package name is required");
            return;
          }

          const isDirExists = fs.existsSync(
            path.join(workspaceFolders[0].uri.fsPath, "packages", packageName)
          );

          if (isDirExists) {
            vscode.window.showErrorMessage("Package already exists");
            return;
          }

          const packagePath = path.join(
            workspaceFolders[0].uri.fsPath,
            "packages",
            packageName
          );

          fs.mkdirSync(packagePath);

          const packageJson = {
            name: packageName,
            version: "1.0.0",
            main: "index.js",
            license: "MIT",
          };

          fs.writeFileSync(
            path.join(packagePath, "package.json"),
            JSON.stringify(packageJson, null, 2)
          );

          fs.writeFileSync(
            path.join(packagePath, "index.js"),
            `console.log('Hello from ${packageName}');`
          );

          vscode.window.showInformationMessage(
            `Package ${packageName} created successfully`
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
