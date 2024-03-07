import * as vscode from "vscode";
import { getPackages, createDirectory } from "../utils";

export const createPackage = vscode.commands.registerCommand(
  "turborepo-helper.createPackage",
  () => {
    getPackages();
    createDirectory().then((result) => {
      if (result.success) {
        vscode.window.showInformationMessage(
          `Package created at ${result.path}`
        );
      }
    });
  }
);
