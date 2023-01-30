#!/bin/bash

set -euo pipefail

echo "=== Local variables ==="
### Local variables
# defaults if not provided via env
# This allows to bypass 'npm run audit' >=high vulnerabilities if needed
ALLOW_AUDIT_FAILURES="${ALLOW_AUDIT_FAILURES:-false}"
# This allows to bypass 'npm run test' failures if needed
ALLOW_FAILURES="${ALLOW_FAILURES:-true}"
DEV_RELEASE="${DEV_RELEASE:-false}"
IMAGE_NAME="${IMAGE_NAME:-node}"
IMAGE_TAG="${IMAGE_TAG:-16-buster}"
VERSION="${TRAVIS_TAG:-$TRAVIS_COMMIT}"

# validation that some characters invalid in file names are replaced by _
echo "=== Validating version ==="
VERSION="$(sed 's|[/\ <>():&$%]|_|g' <<< "${VERSION}")"

image="${IMAGE_NAME}:${IMAGE_TAG}"
package_json_version=$(jq -r '.version' "${TRAVIS_BUILD_DIR}/package.json")
packagelock_json_version=$(jq -r '.version' "${TRAVIS_BUILD_DIR}/package-lock.json")

# absolute path to project from relative location of this script
workdir="$( cd "$( dirname "${BASH_SOURCE[0]}" )/.." &> /dev/null && pwd )"
echo "=== Workdir: ${workdir} ==="

command -v docker &> /dev/null && have_docker="true" || have_docker="false"

# Functions
function fn_die() {
  echo -e "$1" >&2
  exit "${2:-1}"
}

function verify_param() {
  echo "=== Checking if $1 is set ==="
  if [ -z "$2" ]; then
    fn_die "$1 variable is not set. Exiting ..."
  fi
}

function verify_release_requirements() {
  IS_RELEASE=$1
  IS_DEV=$2
  TAG=$3
  if [ "${IS_RELEASE}" = "true" ]; then
    # Checking version requirements before publishing
    if [ "${IS_DEV}" = "false" ]; then
      # Checking the tag's format for PROD release
      echo "=== Checking the tag's format for PROD release ==="
      REG_EXP='^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$'
      MATCH="$(echo "${TAG}" | grep -P "${REG_EXP}")"
      if ! [[ "${MATCH}" ]]; then
        fn_die "Git tag is in the wrong format for PROD release. It has to match semantic versioning in the following format: DIGIT.DIGIT.DIGIT\nFor example: 1.0.0\nExiting the build... "
      fi
    elif [ "${IS_DEV}" = "true" ]; then
      # Checking the tag's format for DEV release
      echo "=== Checking the tag's format for DEV release ==="
      REG_EXP='^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$'
      MATCH="$(echo "${TAG}" | grep -P "${REG_EXP}")"
      if ! [[ "${MATCH}" ]]; then
        fn_die "Git tag is in the wrong format for DEV release. It has to match semantic versioning in the following format: DIGIT.DIGIT.DIGIT-ALPHA.DIGIT\nFor example: 1.0.0-rc.1\nExiting the build... "
      fi
    fi
  fi
}

function verify_release_versions() {
  IS_RELEASE=$1
  pj_version=$2
  plj_version=$3
  TAG=$4
  if [ "${IS_RELEASE}" = "true" ]; then
     # Checking if versions match across the files
     echo "=== Checking if versions match across the files ==="
     if ! [[ "${pj_version}" == "${plj_version}" && "${plj_version}" == "${TAG}" ]]; then
       fn_die "The release tag and package version in json files do not match. Make sure the version number matches!\nExiting the build... "
     fi
   fi
}

echo "=== Checking input params are set ==="
verify_param NPM_GITHUB_TOKEN "${NPM_GITHUB_TOKEN}"
verify_param CLOUDFLARE_API_TOKEN "${CLOUDFLARE_API_TOKEN}"
verify_param CLOUDFLARE_ACCOUNT_ID "${CLOUDFLARE_ACCOUNT_ID}"

echo "=== Checking requirements for the release ==="
# shellcheck disable=SC2153
verify_release_requirements "${IS_A_RELEASE}" "${DEV_RELEASE}" "${TRAVIS_TAG}"
verify_release_versions "${IS_A_RELEASE}" "${package_json_version}" "${packagelock_json_version}" "${TRAVIS_TAG}"


# build the package
echo "=== Building the package ==="
# build the package
if [ "${have_docker}" = "true" ]; then
  docker run --rm -t -v "$workdir":/build \
    --entrypoint /build/ci/docker/entrypoint.sh \
    -e LOCAL_USER_ID="$(id -u)" \
    -e LOCAL_GRP_ID="$(id -g)" \
    -e IS_A_RELEASE \
    -e DEV_RELEASE \
    -e ALLOW_FAILURES \
    -e ALLOW_AUDIT_FAILURES \
    -e NPM_GITHUB_TOKEN \
    -e CLOUDFLARE_API_TOKEN \
    -e CLOUDFLARE_ACCOUNT_ID \
    -e VERSION="${TRAVIS_TAG}" \
    -e REPO_SLUG="${TRAVIS_REPO_SLUG}" \
    -e TRAVIS_PULL_REQUEST="${TRAVIS_PULL_REQUEST}" \
    -e TRAVIS_BRANCH="${TRAVIS_BRANCH}" \
    -e DEV_RELEASE_BRANCH="${DEV_RELEASE_BRANCH}" \
    "${image}" /build/ci/build.sh
else
  "${workdir:-.}/ci/build.sh"
fi


