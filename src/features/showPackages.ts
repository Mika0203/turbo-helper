import * as vscode from "vscode";
import { getPackages, moveToPackage } from "../utils";

export const showPackages = vscode.commands.registerCommand(
  "turborepo-helper.showPackages",
  () => {
    vscode.window.showQuickPick(getPackages()).then(moveToPackage);
  }
);
