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


