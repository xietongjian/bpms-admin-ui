import type { Options as HtmlMinifierOptions } from 'html-minifier-terser';
import type { PluginOption } from 'vite';

import { minify } from 'html-minifier-terser';
import { loadEnv } from 'vite';

const HTML_MINIFY_OPTIONS = {
  collapseWhitespace: true,
  minifyCSS: true,
  minifyJS: true,
  removeComments: true,
  removeRedundantAttributes: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true,
  useShortDoctype: true,
} as const;

function viteHtmlPlugin(): PluginOption {
  return {
    name: 'vben-native-html',
    config(_config, { mode }) {
      // 在 config 阶段缓存 env 变量，供 transformIndexHtml 使用
      const env = loadEnv(mode, process.cwd(), 'VITE_');
      (this as any).__env = env;
    },
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        const env = (this as any).__env || {};
        // 替换 <%= VAR %> 模板变量为 env 中对应的值
        return html.replace(/<%=\s*(\w+)\s*%>/g, (_match, varName: string) => {
          return env[varName] || '';
        });
      },
    },
  };
}

function viteMinifyPlugin(options: HtmlMinifierOptions = {}): PluginOption {
  return {
    name: 'vben-native-html-minify',
    transformIndexHtml: {
      order: 'post',
      async handler(html, ctx) {
        if (!ctx.bundle) {
          return html;
        }
        return await minify(html, {
          ...HTML_MINIFY_OPTIONS,
          ...options,
        });
      },
    },
  };
}

export { viteHtmlPlugin, viteMinifyPlugin };
