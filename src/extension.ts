import * as vscode from "vscode";
import { showPackages } from "./features";
import { createPackage } from "./features/createPackage";

const features = [createPackage, showPackages];

export function activate(context: vscode.ExtensionContext) {
  features.forEach((feature) => {
    context.subscriptions.push(feature);
  });
}

export function deactivate() {}
