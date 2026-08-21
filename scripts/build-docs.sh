#!/usr/bin/env sh

set -eu

output=${1:-document-reader-static-doc.html}
bundle_dir=$(mktemp -d "${TMPDIR:-/tmp}/document-reader-docs.XXXXXX")
normalized_dir="$bundle_dir/normalized"
source_bundle="$bundle_dir/source.yml"
docs_bundle="$bundle_dir/docs.yml"

cleanup() {
  rm -rf "$normalized_dir"
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

normalize_yaml() {
  awk '
    BEGIN { quote = "" }
    quote != "" {
      print "  " $0
      if ((quote == "\"" && $0 ~ /"[[:space:]]*$/) ||
          (quote == "\047" && $0 ~ /\047[[:space:]]*$/)) {
        quote = ""
      }
      next
    }
    {
      print
      if ($0 ~ /^[[:space:]]*(description|example|title|summary):[[:space:]]*"/ &&
          $0 !~ /"[[:space:]]*$/) {
        quote = "\""
      } else if ($0 ~ /^[[:space:]]*(description|example|title|summary):[[:space:]]*\047/ &&
                 $0 !~ /\047[[:space:]]*$/) {
        quote = "\047"
      }
    }
  ' "$1" > "$2"
}

mkdir "$normalized_dir"
find . \
  -path './.git' -prune -o \
  -path './node_modules' -prune -o \
  -type f \( -name '*.yml' -o -name '*.yaml' \) -print |
while IFS= read -r yaml_file; do
  normalized_file="$normalized_dir/${yaml_file#./}"
  mkdir -p "$(dirname "$normalized_file")"
  normalize_yaml "$yaml_file" "$normalized_file"
done

run_redocly bundle "$normalized_dir/index.yml" --config redocly.yml --output "$source_bundle"
run_redocly bundle "$source_bundle" --config redocly.docs.yml --output "$docs_bundle"
run_redocly build-docs "$docs_bundle" \
  --config redocly.yml \
  --template templates/redoc.hbs \
  --output "$output"
