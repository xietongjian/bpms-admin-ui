import externalElements from './resources';

export default function (template: string, replacements?: Record<string, string>) {
  replacements = replacements || {};

  // Translate
  template = externalElements[template] || template;

  // Replace
  return template.replace(/{([^}]+)}/g, function (_, key) {
    return replacements![key] || '{' + key + '}';
  });
}
