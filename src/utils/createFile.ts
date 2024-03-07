import * as vscode from "vscode";

export function createFile(data: any, path: string) {
  vscode.workspace.fs.writeFile(
    vscode.Uri.file(path),
    Buffer.from(typeof data === "string" ? data : JSON.stringify(data, null, 2))
  );
}
