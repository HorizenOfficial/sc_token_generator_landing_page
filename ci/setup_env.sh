#!/bin/bash

set -eo pipefail

export IS_A_RELEASE="false"

# Functions
function fn_die() {
  echo -e "$1" >&2
  exit "${2:-1}"
}

function import_gpg_keys() {
  # shellcheck disable=SC2145
  printf "%s\n" "Tagged build, fetching keys:" "${@}" ""
  #echo "Tagged build, fetching keys: ${@}"
  # shellcheck disable=SC2207
  declare -r my_arr=( $(echo "${@}" | tr " " "\n") )

  for key in "${my_arr[@]}"; do
    echo "Importing key: ${key}"
    gpg -v --batch --keyserver hkps://keys.openpgp.org --recv-keys "${key}" ||
    gpg -v --batch --keyserver hkp://keyserver.ubuntu.com --recv-keys "${key}" ||
    gpg -v --batch --keyserver hkp://pgp.mit.edu:80 --recv-keys "${key}" ||
    gpg -v --batch --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys "${key}"
  done
}

function check_signed_tag() {
  # Checking if git tag signed by the maintainers
  if git verify-tag -v "${1}"; then
    echo "${1} is a valid signed tag"
    export IS_A_RELEASE="true"
  else
    echo "Git tag's = ${1} signature is NOT valid. The build is not going to be released..."
  fi
}

# empty key.asc file in case we're not signing
touch "${HOME}/key.asc"

if [ -n "${TRAVIS_TAG}" ]; then
  # checking if PROD_MAINTAINERS_KEYS and DEV_MAINTAINERS_KEYS are set
  if [[ -z "${PROD_MAINTAINERS_KEYS}" || -z "${DEV_MAINTAINERS_KEYS}" ]]; then
    echo "PROD_MAINTAINERS_KEYS or DEV_MAINTAINERS_KEYS variables are not set. Make sure to set it up for release build!!!"
  fi
  all_maintainers_keys=$(echo "${PROD_MAINTAINERS_KEYS} ${DEV_MAINTAINERS_KEYS}" | xargs -n1 | sort -u | xargs)

  echo "TRAVIS_TAG: ${TRAVIS_TAG}"
  # shellcheck disable=SC2155
  export GNUPGHOME="$(mktemp -d 2>/dev/null || mktemp -d -t 'GNUPGHOME')"

  # Checking PROD vs DEV build
  echo "The current production branch is: ${PROD_RELEASE_BRANCH}"

  # Prod vs development release
  if ( git branch -r --contains "${TRAVIS_TAG}" | grep -xqE ". origin\/${PROD_RELEASE_BRANCH}$" ); then
    echo "" && echo "=== Production release ===" && echo ""

    # shellcheck disable=SC2086
    import_gpg_keys "${PROD_MAINTAINERS_KEYS}"
    check_signed_tag "${TRAVIS_TAG}"
    export DEV_RELEASE=false
  elif ( git branch -r --contains "${TRAVIS_TAG}" | grep -xqE ". origin\/${DEV_RELEASE_BRANCH}$" ); then
    echo "" && echo "=== Development release ===" && echo ""

    # shellcheck disable=SC2086
    import_gpg_keys "${all_maintainers_keys}"
    check_signed_tag "${TRAVIS_TAG}"
    # shellcheck disable=SC2034
    export DEV_RELEASE=true
  fi
fi

if [ "${IS_A_RELEASE}" = "false" ]; then
  echo "" && echo "=== NOT a release build ===" && echo ""
fi

set +eo pipefail
