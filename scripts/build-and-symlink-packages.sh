#!/bin/sh

cd "$( cd "$(dirname "$0")" && pwd )/.."

SCOPE="@app"

build_package() {
  local pkg_path="$1"
  local pkg_name="${pkg_path##*/}"

  echo "\033[0;37m  The $pkg_name package is building...\033[0m"

  result=$(cd "$pkg_path" && npm install 2>&1 && npm run build 2>&1)
  if [ $? -gt 0 ]; then
      echo "$result"
      exit 1
    fi

  echo "\033[A\033[K\033[0;32m✔\033[0m \033[0;37mThe $pkg_name package was build\033[0m"
}

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

for pkg_path in ./packages/*; do
  build_package "$pkg_path"

  for app_path in ./applications/*; do
    create_symlink "$app_path" "$pkg_path"
  done
done