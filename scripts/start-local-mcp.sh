#!/usr/bin/env bash
set -euo pipefail

EXT_DIR="${1:-$(pwd)}"

if [ ! -d "$EXT_DIR/node_modules" ] || [ ! -d "$EXT_DIR/node_modules/ts-node" ]; then
  echo "Installing Rubber Ducky local dependencies..."
  npm install --prefix "$EXT_DIR"
fi

exec node --loader ts-node/esm "$EXT_DIR/src/server.ts"
