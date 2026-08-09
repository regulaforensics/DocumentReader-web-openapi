const ENUM_TABLE_MARKER = '| Value | Name | Description |';
const ENUM_TAG = 'Enums';

function escapeTableCell(value) {
  return String(value)
    .replaceAll('\\', '\\\\')
    .replaceAll('|', '\\|')
    .replaceAll(/\r?\n/g, '<br>');
}

function enumReference(name, schema) {
  const reference = {
    type: schema.type,
    description: `See [${name}](#schema/${encodeURIComponent(name)}) enumeration values.`,
  };

  if (schema.format) {
    reference.format = schema.format;
  }

  if (schema.nullable !== undefined) {
    reference.nullable = schema.nullable;
  }

  return reference;
}

function addEnumTable(schema) {
  const values = schema.enum;

  if (!Array.isArray(values) || schema.description?.includes(ENUM_TABLE_MARKER)) {
    return;
  }

  const descriptions = schema['x-enum-descriptions'];
  const variableNames = schema['x-enum-varnames'];
  const rows = values.map((value, index) => {
    const variableName = variableNames?.[index] ?? '';
    const description = descriptions?.[index] ?? '';

    return `| ${escapeTableCell(value)} | ${escapeTableCell(variableName)} | ${escapeTableCell(description)} |`;
  });
  const table = [
    ENUM_TABLE_MARKER,
    '| --- | --- | --- |',
    ...rows,
  ].join('\n');

  schema.description = schema.description
    ? `${schema.description}\n\n${table}`
    : table;

  // The table replaces Redoc's compact, single-line enum value list.
  delete schema.enum;
  schema['x-tags'] = [...new Set([...(schema['x-tags'] ?? []), ENUM_TAG])];
}

function replaceEnumReferences(node, enumSchemas, visited = new WeakSet()) {
  if (!node || typeof node !== 'object' || visited.has(node)) {
    return;
  }

  visited.add(node);

  if (typeof node.$ref === 'string') {
    const prefix = '#/components/schemas/';

    if (node.$ref.startsWith(prefix)) {
      const name = decodeURIComponent(node.$ref.slice(prefix.length));
      const enumSchema = enumSchemas.get(name);

      if (enumSchema) {
        const existingDescription = node.description;

        for (const key of Object.keys(node)) {
          delete node[key];
        }

        Object.assign(node, enumReference(name, enumSchema));

        if (existingDescription) {
          node.description = `${existingDescription}\n\n${node.description}`;
        }

        return;
      }
    }
  }

  for (const value of Object.values(node)) {
    replaceEnumReferences(value, enumSchemas, visited);
  }
}

function addEnumNavigation(root) {
  const schemas = root.components?.schemas ?? {};
  const schemaEntries = Object.entries(schemas);
  const enumEntries = schemaEntries
    .filter(([, schema]) => Array.isArray(schema.enum))
    .sort(([left], [right]) => {
      const normalizedOrder = left
        .toLocaleLowerCase('en')
        .localeCompare(right.toLocaleLowerCase('en'));

      return normalizedOrder || left.localeCompare(right);
    });
  const enumSchemas = new Map(enumEntries);

  root.components.schemas = Object.fromEntries([
    ...schemaEntries.filter(([, schema]) => !Array.isArray(schema.enum)),
    ...enumEntries,
  ]);

  for (const schema of enumSchemas.values()) {
    addEnumTable(schema);
  }

  replaceEnumReferences(root.paths, enumSchemas);
  replaceEnumReferences(root.components, enumSchemas);

  root.tags ??= [];
  if (!root.tags.some((tag) => tag.name === ENUM_TAG)) {
    root.tags.push({
      name: ENUM_TAG,
      description: 'Enumeration definitions.',
    });
  }

  root['x-tagGroups'] ??= [];
  if (!root['x-tagGroups'].some((group) => group.tags?.includes(ENUM_TAG))) {
    root['x-tagGroups'].push({
      name: 'Definitions',
      tags: [ENUM_TAG],
    });
  }
}

export default function enumTablesPlugin() {
  return {
    id: 'enum-tables',
    decorators: {
      oas3: {
        'for-redoc': () => ({
          Root: {
            enter: addEnumNavigation,
          },
        }),
      },
    },
  };
}
