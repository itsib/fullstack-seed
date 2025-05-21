#!/bin/sh

cd "$( cd "$(dirname "$0")" && pwd )/.."

SCOPE="@app"

create_symlink() {
  local app_path="$1"
  local pkg_path="$2"

  pkg_name="${pkg_path##*/}"
  app_name="${app_path##*/}"
  app_node_modules="$app_path/node_modules"

  mkdir -p "$app_node_modules/$SCOPE"

  result=$(cd "$app_node_modules/$SCOPE" && ln --force --symbolic --relative -T "../../../../packages/$pkg_name" "$pkg_name")
  if [ $? -gt 0 ]; then
    echo "$result"
    exit 1
  fi

  echo "\033[0;32m✔\033[0m \033[0;37mSymlink created $app_name -> $pkg_name\033[0m"
}

for package_path in ./packages/*; do
  for application_path in ./applications/*; do
    create_symlink "$application_path" "$package_path"
  done
done