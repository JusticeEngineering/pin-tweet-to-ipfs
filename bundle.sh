#!/usr/bin/env bash
set -e
pushd "$(dirname "$0")" > /dev/null

cp LICENSE build/

cd build

zip -r ../extension \
    "manifest.json" \
    "background.js" \
    "content.js" \
    "Popup/index.css" \
    "Popup/index.js" \
    "Popup/popup.html" \
    "icon-16.png" \
    "icon-34.png" \
    "icon-128.png" \
    "LICENSE"
