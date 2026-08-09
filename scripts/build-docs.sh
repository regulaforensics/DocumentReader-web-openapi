#!/usr/bin/env sh

set -eu

output=${1:-document-reader-static-doc.html}
bundle_dir=$(mktemp -d "${TMPDIR:-/tmp}/document-reader-docs.XXXXXX")
source_bundle="$bundle_dir/source.yml"
docs_bundle="$bundle_dir/docs.yml"

cleanup() {
  rm -f "$source_bundle" "$docs_bundle"
  rmdir "$bundle_dir"
}

trap cleanup EXIT HUP INT TERM

run_redocly() {
  if command -v redocly >/dev/null 2>&1; then
    redocly "$@"
  else
    npx @redocly/cli "$@"
  fi
}

run_redocly bundle index.yml --config redocly.yml --output "$source_bundle"
run_redocly bundle "$source_bundle" --config redocly.docs.yml --output "$docs_bundle"
run_redocly build-docs "$docs_bundle" \
  --config redocly.yml \
  --template templates/redoc.hbs \
  --output "$output"
