#!/bin/bash
# shellcheck disable=SC2086

set -euo pipefail

# Configuring npm login settings
echo "" && echo "=== Configuring npm login settings ===" && echo ""
# Configuring npm login settings
cp -a /build/.npmrc.template "${HOME}/.npmrc"

cd /build

# Installing dependencies
echo "" && echo "=== Installing all NPM dependencies ===" && echo ""
npm ci

# Running npm audit and exiting on HIGH vulnerability level
echo "" && echo "=== Running NPM audit ===" && echo ""
npm audit --omit=dev --audit-level=high || { [ "${ALLOW_AUDIT_FAILURES}" = "true" ] && true || false; }

# Compile a package
echo "" && echo "=== Running NPM Compile ===" && echo ""
npm run build

# Running tests
echo "" && echo "=== Running NPM tests ===" && echo ""
# shellcheck disable=SC2015
npm run test || { [ "${ALLOW_FAILURES}" = "true" ] && true || false; }

# If a release publish to cloudflare
if [ "${IS_A_RELEASE}" = "true" ]; then
  if [ "${DEV_RELEASE}" = "false" ]; then
    echo "" && echo "=== Release Generated: Publish to Cloudflare testnet-prod ===" && echo ""
    { yes n || true; } | npm run deploy:testnet-prod
    echo "" && echo "=== Generating Release ${VERSION} for ${REPO_SLUG} ===" && echo ""
    curl -X POST -H "Accept: application/vnd.github+json" -H "Authorization: token ${NPM_GITHUB_TOKEN}" https://api.github.com/repos/"${REPO_SLUG}"/releases -d "{\"tag_name\":\"${VERSION}\",\"generate_release_notes\":true}"
  else
    echo "" && echo "=== Release Candidate generated: Publish to Cloudflare testnet ===" && echo ""
    { yes n || true; } | npm run deploy:testnet
  fi
elif [ "${TRAVIS_PULL_REQUEST}" = "false" ]; then
  if [ "${TRAVIS_BRANCH}" = "${DEV_RELEASE_BRANCH}" ]; then
    echo "" && echo "=== Merge into ${TRAVIS_BRANCH}: Publish to Cloudflare testnet ===" && echo ""
    { yes n || true; } | npm run deploy:testnet
  fi
fi


