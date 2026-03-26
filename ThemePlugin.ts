import fs from 'fs';
import path from 'path';
import { Compiler, Compilation, WebpackError } from 'webpack';

type PluginOptions = {
  input: string;
  output?: string;
  typesOutput?: string;
};

class ThemePlugin {
  private options: PluginOptions;
  private output: string;
  private typesOutput: string;

  constructor(options: PluginOptions) {
    if (!options.output || !options.typesOutput) {
      throw new Error('ThemePlugin: output and typesOutput paths are required in configuration.');
    }
    this.options = options;
    this.output = path.resolve(process.cwd(), options.output);
    this.typesOutput = path.resolve(process.cwd(), options.typesOutput);
  }




  private processAssets(compilation: Compilation, callback: () => void) {
    const { input } = this.options;

    compilation.compiler.inputFileSystem.readFile(input, (err, data) => {
      if (err) {
        compilation.errors.push(new WebpackError(`ThemePlugin: Failed to read ${input}`));
        return callback();
      }

      let json: Object;
      try {
        const jsonData = data.toString('utf8');
        json = JSON.parse(jsonData);
      } catch {
        compilation.errors.push(new WebpackError(`ThemePlugin: Invalid JSON in ${input}`));
        return callback();
      }

      json = this.resolveVariables(json, json);

      const variables = this.generateCssVariables(json);
      const classes = this.generateCssClasses(json);
      const types = this.generateTypes(json);
      this.ensureDirectoriesExist();
      this.emitAssets(compilation, variables, classes, types);
      callback();
    });
  }

  private resolveVariables(obj: any, root: any): any {
    if (typeof obj === 'string') {
      return obj.replace(/{(.*?)}/g, (_, path) => {
        const keys = path.split('.');
        let value = root;
        for (const key of keys) {
          if (value && typeof value === 'object' && key in value) {
            value = value[key];
          } else {
            return `{${path}}`;
          }
        }
        return value;
      });
    } else if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = this.resolveVariables(obj[key], root);
      }
    }
    return obj;
  }

  private toCamelCase(str: string): string {
    return str.replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '')).replace(/^./, (c) => c.toLowerCase());
  }

  private generateCssClasses(
    obj: Record<string, any>,
    prefix = '',
    isPalette = false
  ): string {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = this.toCamelCase(`${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`);

      if (typeof value === 'object') {
        return acc + this.generateCssClasses(value, newKey, prefix.toLowerCase() === 'palette');
      }

      if (isPalette) {
        let classContent = `.${newKey} { color: var(--${newKey}); }\n`;
        if (prefix.toLowerCase().includes('background')) {
          classContent = `.${newKey} { background-color: var(--${newKey}); }\n`;
        }
        return acc + classContent;
      }

      return acc;
    }, '');
  }

  private generateCssVariables(
    obj: Record<string, any>,
    prefix = ''
  ): string {
    return Object.entries(obj).reduce((acc, [key, value]) => {
      const newKey = this.toCamelCase(`${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`);

      if (typeof value === 'object') {
        return acc + this.generateCssVariables(value, newKey);
      }

      return acc + `  --${newKey}: ${value};\n`;
    }, '');
  }

  private generateTypes(
    obj: Record<string, any>,
    prefix = '',
    typeEntries: Set<string> = new Set()
  ): string {
    Object.entries(obj).forEach(([key, value]) => {
      const newKey = this.toCamelCase(`${prefix}${key.charAt(0).toUpperCase()}${key.slice(1)}`);

      if (typeof value === 'object') {
        this.generateTypes(value, newKey, typeEntries);
      } else {
        typeEntries.add(`"${newKey}"`);
      }
    });

    return Array.from(typeEntries).join(' | ') || 'string';
  }

  private ensureDirectoriesExist() {
    fs.mkdirSync(path.dirname(this.output), { recursive: true });
    fs.mkdirSync(path.dirname(this.typesOutput), { recursive: true });
  }

  private shouldWriteFile(filePath: string, newContent: string): boolean {
    if (fs.existsSync(filePath)) {
      const existingContent = fs.readFileSync(filePath, 'utf8');
      return existingContent !== newContent;
    }
    return true;
  }

  private emitAssets(
    compilation: Compilation,
    variables: string,
    classes: string,
    types: string
  ) {
    const cssContent = `:root {\n${variables}}\n\n${classes}`;
    const typesContent = `export type ThemeTokens = ${types};\n\nexport const themeTokens: ThemeTokens[] = [${types.replace(/\|/g, ',')}];`;


    if (this.shouldWriteFile(this.output, cssContent)) {
      fs.writeFileSync(this.output, cssContent, 'utf8');
      console.log(`ThemePlugin: CSS файл обновлен в ${this.output}`);
    } else {
      console.log(`ThemePlugin: CSS файл не изменился, пропускаем запись.`);
    }

    if (this.shouldWriteFile(this.typesOutput, typesContent)) {
      fs.writeFileSync(this.typesOutput, typesContent, 'utf8');
      console.log(`ThemePlugin: TypeScript файл обновлен в ${this.typesOutput}`);
    } else {
      console.log(`ThemePlugin: TypeScript файл не изменился, пропускаем запись.`);
    }
  }

  apply(compiler: Compiler) {
    compiler.hooks.thisCompilation.tap('ThemePlugin', (compilation) => {
      compilation.hooks.processAssets.tapAsync(
        {
          name: 'ThemePlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_ADDITIONS,
        },
        (assets, callback) => {
          this.processAssets(compilation, callback);
        }
      );
    });
    compiler.hooks.afterCompile.tap('ThemePlugin', (compilation) => {
      compilation.fileDependencies.delete(this.output);
      compilation.fileDependencies.delete(this.typesOutput);
    });
  }

}

export default ThemePlugin;
