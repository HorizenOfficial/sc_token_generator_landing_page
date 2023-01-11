#!/bin/bash

set -euo pipefail

echo "=== Local variables ==="
ALLOW_AUDIT_FAILURES="${ALLOW_AUDIT_FAILURES:-false}"
ALLOW_FAILURES="${ALLOW_FAILURES:-false}"
DEV_RELEASE="${DEV_RELEASE:-false}"
IMAGE_NAME="${IMAGE_NAME:-node}"
IMAGE_TAG="${IMAGE_TAG:-16-buster}"
VERSION="${TRAVIS_TAG:-$TRAVIS_COMMIT}"
DEV_ENVIRONMENTS="${DEV_ENVIRONMENTS:-"TESTNET_DEV TESTNET_DEV_BANNER MAINNET_DEV MAINNET_DEV_BANNER"}"
PROD_ENVIRONMENTS="${PROD_ENVIRONMENTS:-"TESTNET_PROD TESTNET_PROD_BANNER MAINNET_PROD MAINNET_PROD_BANNER"}"

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

# checking if NPM_GITHUB_TOKEN is set
echo "=== Checking if NPM_GITHUB_TOKEN is set ==="
if [ -z "${NPM_GITHUB_TOKEN}" ]; then
  fn_die "NPM_GITHUB_TOKEN variable is not set. Exiting ..."
fi

# Checking requirements for the release
echo "=== Checking requirements for the release ==="
if [ "${IS_A_RELEASE}" = "true" ]; then
  # Checking version requirements before publishing
  if [ "${DEV_RELEASE}" = "false" ]; then
    # Checking the tag's format for PROD release
    echo "=== Checking the tag's format for PROD release ==="
    REG_EXP='^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)$'
    MATCH="$(echo "${TRAVIS_TAG}" | grep -P "${REG_EXP}")"
    if ! [[ "${MATCH}" ]]; then
      fn_die "Git tag is in the wrong format for PROD release. It has to match semantic versioning in the following format: DIGIT.DIGIT.DIGIT\nFor example: 1.0.0\nExiting the build... "
    fi
  elif [ "${DEV_RELEASE}" = "true" ]; then
    # Checking the tag's format for DEV release
    echo "=== Checking the tag's format for DEV release ==="
    REG_EXP='^(0|[1-9]\d*)\.(0|[1-9]\d*)\.(0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$'
    MATCH="$(echo "${TRAVIS_TAG}" | grep -P "${REG_EXP}")"
    if ! [[ "${MATCH}" ]]; then
      fn_die "Git tag is in the wrong format for DEV release. It has to match semantic versioning in the following format: DIGIT.DIGIT.DIGIT-ALPHA.DIGIT\nFor example: 1.0.0-rc.1\nExiting the build... "
    fi
  fi
  # Checking if versions match across the files
  echo "=== Checking if versions match across the files ==="
  if ! [[ "${package_json_version}" == "${packagelock_json_version}" && "${packagelock_json_version}" == "${TRAVIS_TAG}" ]]; then
    fn_die "The release tag and package version in json files do not match. Make sure the version number matches!\nExiting the build... "
  fi
fi

# Audit, Compile and run Tests
echo "=== Audit, Compile and run Tests ==="
if [ "${have_docker}" = "true" ]; then
  echo "$DOCKER_READER_PASSWORD" | docker login -u "$DOCKER_READER_USERNAME" --password-stdin
  docker run --rm -t -v "$workdir":/build \
    --entrypoint /build/ci/script-entrypoint.sh \
    -e LOCAL_USER_ID="$(id -u)" \
    -e LOCAL_GRP_ID="$(id -g)" \
    -e ALLOW_FAILURES \
    -e ALLOW_AUDIT_FAILURES \
    -e NPM_GITHUB_TOKEN \
    "${image}" /build/ci/build.sh
else
  "${workdir:-.}/ci/build.sh"
fi

# If a production tag push Release to GitHub
if [ "${IS_A_RELEASE}" = "true" ] && [ "${DEV_RELEASE}" = "false" ]; then
  echo "" && echo "=== Generating Release ${TRAVIS_TAG} for ${TRAVIS_REPO_SLUG} ===" && echo ""
  curl -X POST -H "Accept: application/vnd.github+json" -H "Authorization: token ${NPM_GITHUB_TOKEN}" https://api.github.com/repos/"${TRAVIS_REPO_SLUG}"/releases -d "{\"tag_name\":\"${TRAVIS_TAG}\",\"generate_release_notes\":true}"
fi

# Generate Docker Images and push to Docker Hub
docker_tag=""
if [ "${IS_A_RELEASE}" = "true" ]; then
  docker_tag="${TRAVIS_TAG}"
elif [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  if [ "${TRAVIS_BRANCH}" = "${PROD_RELEASE_BRANCH}" ]; then
    docker_tag=latest
  elif [ "${TRAVIS_BRANCH}" = "${DEV_RELEASE_BRANCH}" ]; then
    docker_tag=dev
  fi
fi

if [ "${docker_tag}" = "" ]; then
  echo "" && echo "=== Feature branch, no Docker image is generated ===" && echo ""
else
  environments="${DEV_ENVIRONMENTS}"
  # If it is a production tag or a merge/commit into master use production environments
  if { [ "${IS_A_RELEASE}" = "true" ] && [ "${DEV_RELEASE}" = "false" ]; } || { [ "${TRAVIS_PULL_REQUEST}" = "false" ] && [ "${TRAVIS_BRANCH}" = "${PROD_RELEASE_BRANCH}" ]; }; then
    environments="${PROD_ENVIRONMENTS}"
  fi
  echo "" && echo "=== Publishing Docker images ===" && echo ""
  echo "$DOCKER_WRITER_PASSWORD" | docker login -u "$DOCKER_WRITER_USERNAME" --password-stdin
  for environment in ${environments}; do
    docker build --build-arg NODE_VERSION=16 --build-arg ARG_ENVIRONMENT="${environment}" -f ci/Dockerfile -t "${DOCKER_IMAGE_NAME}:${docker_tag}-${environment}" .
    docker push "${DOCKER_IMAGE_NAME}:${docker_tag}-${environment}"
  done
fi







