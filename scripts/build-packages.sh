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

for package_path in ./packages/*; do
  build_package "$package_path"
done