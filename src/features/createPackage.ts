import * as vscode from "vscode";
import { createDirectory, createFile } from "../utils";

const tsconfing = {
  extends: "@repo/typescript-config/react-library.json",
  compilerOptions: { outDir: "dist" },
  include: ["src"],
  exclude: ["node_modules", "dist"],
};

const indexTs = 'export * from "./src";';

const packageJson = {
  name: "package-name",
  version: "0.0.0",
  main: "dist/index.js",
  types: "dist/index.d.ts",
  files: ["dist"],
  scripts: {
    build: "tsc",
    test: "jest",
  },
  devDependencies: {
    "@repo/typescript-config": "latest",
    jest: "latest",
    typescript: "latest",
  },
  peerDependencies: {},
  dependencies: {},
};

export const createPackage = vscode.commands.registerCommand(
  "turborepo-helper.createPackage",
  () => {
    createDirectory().then((result) => {
      if (result.success) {
        // create tsconfig.json
        createFile(tsconfing, `${result.path}/tsconfig.json`);
        createFile(indexTs, `${result.path}/index.ts`);
        vscode.workspace.fs.createDirectory(
          vscode.Uri.file(`${result.path}/src`)
        );

        vscode.window.showInformationMessage(
          `Package created at ${result.path}`
        );
      }
    });
  }
);
