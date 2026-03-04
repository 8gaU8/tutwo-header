#! /bin/bash
set -o errexit
set -o nounset
set -o pipefail

cd "$(dirname "$0")"



OWNER='8gaU8'
REPO='tutwo-header'
ASSETS="$(basename "$(command ls ../dist/assets/index-*.js )")"

URL="https://cdn.jsdelivr.net/gh/${OWNER}/${REPO}@main/dist/assets/${ASSETS}"
echo "${URL}"